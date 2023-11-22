---
title: Syncing solid-js resources to a global store
description: Most complex web-apps make use of a global state, and tying data management and fetching to components makes it clunky to properly sync data between global and local. Solve all issues in your solid-js app by using the storage option on resources.
date: 2023-11-21
tags:
  - solidjs
  - webdev
---

Solid provides a `createResource` function that gives you a few niceties out of the box for working with async data.

Stuff like:
- automatic refetching on reactivity changes
- signals for checking if the data is loading
- and of course, `Suspense`.

`Suspense` can't be triggered any other way, so most solid apps are going to be using resources extensively.

The drawback is that `createResource` pushes you into a pattern of data locality, where the data is only being used in the component that defined the resources (or it's children).

> Data locality is nice until it isn't

Most complex web-apps make use of a global state, and tying data management and fetching to components makes it clunky to properly sync data between global and local.


A naive first approach for achieving this syncing might look like this:

```tsx
const [data] = createResource(fetchData);
const [state, setState] = useContext(GlobalState);

createEffect(() => {
  setState("data", data());
});
```

The issue with this is that you can sync the data to the store, but if there's any reactive change to the data in the store, the resource data wouldn't change.

So syncing only works one way `resource -> store`.

## The storage option

Solid resources accept a `storage` property that can be used to override the internal logic for holding the resource's data.

We can imagine the simplified internals of a `createResource` to look something like this:
```ts
const createResource = (fetchingFunction) => {
  const [data, setData] = createSignal();
  createEffect(() => {
    fetchingFunction().then(result => setData(result));
  })
}
```

The resource fetches the data automatically and stores the result in a reactive signal.

The `storage` option would let us replace that `createSignal` call with any other function that has the return type as a signal, which would be `[Getter, Setter]`.


The solid docs have an example of using the storage option to store the data in a solid store instead of a signal. See `createDeepSignal` [here](https://www.solidjs.com/docs/latest/api#createresource:~:text=New%20in%201.5.0%20Experimental).

```ts
function createDeepSignal<T>(value: T): Signal<T> {
  const [store, setStore] = createStore({ value });
  return [
    () => store.value,
    (v: T) => {
      const unwrapped = unwrap(store.value);
      typeof v === "function" && (v = v(unwrapped));
      setStore("value", reconcile(v));
      return store.value;
    }
  ] as Signal<T>;
}
```

In this example, using a store alongside the `reconcile` function for setting data is done for the purpose of having the fetched data be reactive only on the properties that have changed value instead of the whole data object triggering reactivity.

## Abusing the storage option

But what if we take this example further, and instead of creating a new store for each resource, we create a custom storage function that gets and sets data to a global store?

Let's assume we have a solid store we can access through a hook like:
```ts
const [state, setState] = useGlobal();
```

And that the store's state is:
```ts
{
  songs: [
    {name: 'Never Gonna Give You Up', rating: 8},
    {name: 'Windows Erros Remix [10 Hours]', rating: 10}
  ]
}
```

What we would want is that in our component, we use a resource that fetches the songs data and manages local state for `loading`.

But that the resource is backed by the global state, so that if there are any changes to the songs in the global state, the changes would be reflected in the resource, and the other way around as well. Two-way binding: `store <-> resource`.

```tsx
const storeBackedSongs = () => {
  const [state, setState] = useGlobal();

  const getter = () => state.songs;

  const setter = (value) => setState('songs', songs => {
    // setters can receive either a value, or a function
    // that returns a value for that reason we need to handle both cases
    if(typeof value === "function") return value(songs);
    return songs;
  });

    return [getter, setter];
}

// Using it in a component
const Songs = () => {
  const [songs] = createResource(fetchSongs, {storage: storeBackedSongs});

  return <Suspense fallback={<Loading />}>
    <SongsList songs={songs()} />
  </Suspense>
}
```

Now if somewhere else in the app someone changes the songs through the store:
`setState("songs", []);`

If the resource and component are still mounted, the `SongsList` component will update with the empty array value.

Similarly, if you change the value of the songs resource, either by refetching or with a mutate, that will update the store state and reflect the changes in all places where `store.songs` is used.
```ts
const [songs, {mutate, refetch}] = createResource(fetchSongs, {storage: storeBackedSongs});

// Both of these calls will update not only the resource's data, but store.songs as well
mutate([]);
refetch();
```

## SSR
For people using `solid-start`, this pattern works just as well for `createRouteData` and the other route data functions, since they all wrap around resources and expose the `storage` option.
## Extra info

The example above is simplified so it's easier to understand the main points.

The code does work, but it's missing types. If you were to copy the implementation and you're using typescript you will run into some weird type issues stemming from the complex generic type that `storage` accepts.

I have published a full working example here: [link to repo](https://github.com/andi23rosca/solid-storage-example).
It has proper types and also a generic `createResourceStorage` function that you can copy and reuse to simplify your code.

Happy coding!
