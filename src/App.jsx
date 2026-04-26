import { useEffect, useState } from "react";
import { Link, useRoutes } from "react-router-dom";
import { supabase } from "./client";

import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import EditCreator from "./pages/EditCreator";
import AddCreator from "./pages/AddCreator";

function App() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching creators:", error);
        setErrorMessage("Could not load creators. Please try again later.");
      } else {
        setCreators(data || []);
      }

      setLoading(false);
    };

    fetchCreators();
  }, []);

  const addCreatorToState = (newCreator) => {
    setCreators((previousCreators) => [...previousCreators, newCreator]);
  };

  const updateCreatorInState = (updatedCreator) => {
    setCreators((previousCreators) =>
      previousCreators.map((creator) =>
        creator.id === updatedCreator.id ? updatedCreator : creator,
      ),
    );
  };

  const deleteCreatorFromState = (deletedId) => {
    setCreators((previousCreators) =>
      previousCreators.filter(
        (creator) => String(creator.id) !== String(deletedId),
      ),
    );
  };

  const element = useRoutes([
    {
      path: "/",
      element: (
        <ShowCreators
          creators={creators}
          loading={loading}
          errorMessage={errorMessage}
        />
      ),
    },
    {
      path: "/creator/:id",
      element: <ViewCreator />,
    },
    {
      path: "/edit/:id",
      element: (
        <EditCreator
          updateCreatorInState={updateCreatorInState}
          deleteCreatorFromState={deleteCreatorFromState}
        />
      ),
    },
    {
      path: "/new",
      element: <AddCreator addCreatorToState={addCreatorToState} />,
    },
  ]);

  return (
    <main className="app-layout">
      <header className="nav-shell">
        <nav className="top-nav app-container">
          <ul>
            <li>
              <Link to="/" className="brand-link">
                Creatorverse
              </Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/new" className="app-button nav-button nav-link">
                Add Creator
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="app-container">{element}</div>
    </main>
  );
}

export default App;
