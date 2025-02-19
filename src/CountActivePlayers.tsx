export function CountActivePlayers() {
  const { user } = useFirebaseAutoSignIn();
  useEffect(() => {
    return () => {};
  }, [user]);
  return <div>There are currently 2 active players.</div>;
}
