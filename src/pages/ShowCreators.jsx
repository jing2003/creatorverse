import { Link } from "react-router-dom";
import Card from "../components/Card";

function ShowCreators({ creators = [] }) {
  const creatorCount = creators.length;

  return (
    <section className="show-creators-page">
      <header className="page-header">
        <div>
          <h1>View All Creators</h1>
          <p>Discover content creators worth following.</p>
          <p className="creator-count">
            {creatorCount} {creatorCount === 1 ? "creator" : "creators"} added
          </p>
        </div>

        <Link to="/new" className="app-button button-primary">
          + Add Creator
        </Link>
      </header>

      {creatorCount === 0 ? (
        <article className="empty-state card-surface">
          <h2>No creators yet</h2>
          <p>Start building your Creatorverse by adding your first creator.</p>

          <Link to="/new" className="app-button button-primary">
            Add Your First Creator
          </Link>
        </article>
      ) : (
        <div className="creator-grid">
          {creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ShowCreators;
