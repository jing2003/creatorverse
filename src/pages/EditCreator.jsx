import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiSave, FiTrash2, FiX } from "react-icons/fi";
import { supabase } from "../client";

function EditCreator({ updateCreatorInState, deleteCreatorFromState }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [creator, setCreator] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching creator:", error);
        setErrorMessage("Could not load this creator.");
      } else {
        setCreator({
          name: data.name || "",
          url: data.url || "",
          description: data.description || "",
          imageURL: data.imageURL || "",
        });
      }

      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCreator((previousCreator) => ({
      ...previousCreator,
      [name]: value,
    }));
  };

  const updateCreator = async (event) => {
    event.preventDefault();
    setSaving(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("creators")
      .update({
        name: creator.name.trim(),
        url: creator.url.trim(),
        description: creator.description.trim(),
        imageURL: creator.imageURL.trim(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating creator:", error);
      setErrorMessage("Something went wrong while updating the creator.");
      setSaving(false);
      return;
    }

    updateCreatorInState(data);
    navigate("/");
  };

  const deleteCreator = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this creator?",
    );

    if (!confirmDelete) return;

    setDeleting(true);
    setErrorMessage("");

    const { error } = await supabase.from("creators").delete().eq("id", id);

    if (error) {
      console.error("Error deleting creator:", error);
      setErrorMessage("Something went wrong while deleting the creator.");
      setDeleting(false);
      return;
    }

    deleteCreatorFromState(id);
    navigate("/");
  };

  if (loading) {
    return (
      <section className="form-page">
        <article className="form-card card-surface">
          <p>Loading creator...</p>
        </article>
      </section>
    );
  }

  return (
    <section className="form-page">
      <Link to="/" className="back-link">
        <FiArrowLeft />
        Back to All Creators
      </Link>

      <article className="form-card card-surface">
        <header className="form-header">
          <h1>Edit Creator</h1>
          <p>
            Update this creator’s information or remove them from your list.
          </p>
        </header>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={updateCreator}>
          <label htmlFor="name">
            Name
            <input
              id="name"
              name="name"
              type="text"
              value={creator.name}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="url">
            URL
            <input
              id="url"
              name="url"
              type="url"
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
              value={creator.imageURL}
              onChange={handleChange}
            />
          </label>

          <div className="form-actions">
            <button
              type="submit"
              className="app-button button-primary"
              disabled={saving || deleting}
            >
              <FiSave />
              {saving ? "Updating..." : "Update Creator"}
            </button>

            <button
              type="button"
              className="app-button button-danger"
              onClick={deleteCreator}
              disabled={saving || deleting}
            >
              <FiTrash2 />
              {deleting ? "Deleting..." : "Delete Creator"}
            </button>

            <Link to="/" className="app-button button-muted">
              <FiX />
              <span>Cancel</span>
            </Link>
          </div>
        </form>
      </article>
    </section>
  );
}

export default EditCreator;
