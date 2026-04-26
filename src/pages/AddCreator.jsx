import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { supabase } from "../client";

function AddCreator({ addCreatorToState }) {
  const navigate = useNavigate();

  const [creator, setCreator] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });

  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCreator((previousCreator) => ({
      ...previousCreator,
      [name]: value,
    }));
  };

  const createCreator = async (event) => {
    event.preventDefault();
    setSaving(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("creators")
      .insert({
        name: creator.name.trim(),
        url: creator.url.trim(),
        description: creator.description.trim(),
        imageURL: creator.imageURL.trim(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding creator:", error);
      setErrorMessage("Something went wrong while adding the creator.");
      setSaving(false);
      return;
    }

    addCreatorToState(data);
    navigate("/");
  };

  return (
    <section className="form-page">
      <Link to="/" className="back-link">
        <FiArrowLeft />
        Back to All Creators
      </Link>

      <article className="form-card card-surface">
        <header className="form-header">
          <h1>Add Creator</h1>
          <p>
            Add a content creator you think is worth following to your
            Creatorverse.
          </p>
        </header>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={createCreator}>
          <label htmlFor="name">
            Name
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Example: The Coding Train"
              value={creator.name}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="url">
            YouTube URL
            <input
              id="url"
              name="url"
              type="url"
              placeholder="https://youtube.com/@example"
              value={creator.url}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              placeholder="What kind of content do they make?"
              value={creator.description}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="imageURL">
            Image URL
            <input
              id="imageURL"
              name="imageURL"
              type="url"
              placeholder="Optional image link"
              value={creator.imageURL}
              onChange={handleChange}
            />
          </label>

          <div className="form-actions">
            <button
              type="submit"
              className="app-button button-primary"
              disabled={saving}
            >
              <FiPlus />
              {saving ? "Adding..." : "Add Creator"}
            </button>

            <Link to="/" className="app-button button-muted">
              Cancel
            </Link>
          </div>
        </form>
      </article>
    </section>
  );
}

export default AddCreator;
