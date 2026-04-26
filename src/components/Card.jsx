import { useState } from "react";
import { Link } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FiEye, FiEdit3, FiExternalLink } from "react-icons/fi";

function Card({ creator }) {
  const [expanded, setExpanded] = useState(false);

  const description = creator.description || "";
  const shouldShowReadMore = description.length > 160;

  return (
    <article className="creator-card card-surface hover-lift">
      <div className="creator-card-header">
        <div className="creator-avatar-wrapper">
          {creator.imageURL ? (
            <img
              src={creator.imageURL}
              alt={creator.name}
              className="avatar avatar-image"
            />
          ) : (
            <div className="avatar avatar-placeholder">
              <CgProfile />
            </div>
          )}

          <span className="youtube-badge">
            <FaYoutube />
          </span>
        </div>

        <h2 className="creator-name">{creator.name}</h2>
      </div>

      <div className="creator-card-body">
        <p
          className={
            expanded ? "creator-description expanded" : "creator-description"
          }
        >
          {description}
        </p>

        {shouldShowReadMore && (
          <button
            type="button"
            className="read-more-button"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "See less" : "See more"}
          </button>
        )}
      </div>

      <footer className="card-actions icon-actions">
        <a
          href={creator.url}
          target="_blank"
          rel="noreferrer"
          className="icon-button button-youtube"
          aria-label="Visit creator page"
          data-label="Visit"
        >
          <FiExternalLink />
        </a>

        <Link
          to={`/creator/${creator.id}`}
          className="icon-button button-muted"
          aria-label="View creator details"
          data-label="Details"
        >
          <FiEye />
        </Link>

        <Link
          to={`/edit/${creator.id}`}
          className="icon-button button-primary"
          aria-label="Edit creator"
          data-label="Edit"
        >
          <FiEdit3 />
        </Link>
      </footer>
    </article>
  );
}

export default Card;

// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaYoutube } from "react-icons/fa";
// import { CgProfile } from "react-icons/cg";
// import { FiEye, FiEdit3, FiExternalLink } from "react-icons/fi";

// function Card({ creator }) {
//   const [expanded, setExpanded] = useState(false);

//   const description = creator.description || "";
//   const shouldShowReadMore = description.length > 160;

//   return (
//     <article className="creator-card">
//       <div className="creator-card-header">
//         <div className="creator-avatar-wrapper">
//           {creator.imageURL ? (
//             <img
//               src={creator.imageURL}
//               alt={creator.name}
//               className="creator-image"
//             />
//           ) : (
//             <div className="creator-placeholder">
//               <CgProfile />
//             </div>
//           )}

//           <span className="youtube-badge">
//             <FaYoutube />
//           </span>
//         </div>

//         <h2 className="creator-name">{creator.name}</h2>
//       </div>

//       <div className="creator-card-body">
//         <p
//           className={
//             expanded ? "creator-description expanded" : "creator-description"
//           }
//         >
//           {description}
//         </p>

//         {shouldShowReadMore && (
//           <button
//             type="button"
//             className="read-more-button"
//             onClick={() => setExpanded(!expanded)}
//           >
//             {expanded ? "See less" : "See more"}
//           </button>
//         )}
//       </div>

//       <footer className="card-actions">
//         <a
//           href={creator.url}
//           target="_blank"
//           rel="noreferrer"
//           className="card-button youtube-button"
//         >
//           <FiExternalLink />
//           Visit
//         </a>

//         <Link to={`/creator/${creator.id}`} className="card-button">
//           <FiEye />
//           Details
//         </Link>

//         <Link to={`/edit/${creator.id}`} className="card-button edit-button">
//           <FiEdit3 />
//           Edit
//         </Link>
//       </footer>
//     </article>
//   );
// }

// export default Card;

// // import { useState } from "react";
// // import { Link } from "react-router-dom";
// // import { FaYoutube } from "react-icons/fa";
// // import { CgProfile } from "react-icons/cg";

// // function Card({ creator }) {
// //   const [expanded, setExpanded] = useState(false);

// //   return (
// //     <article className="creator-card">
// //       {creator.imageURL ? (
// //         <img
// //           src={creator.imageURL}
// //           alt={creator.name}
// //           className="creator-image"
// //         />
// //       ) : (
// //         <div className="creator-placeholder">
// //           <CgProfile />
// //         </div>
// //       )}

// //       <h2>{creator.name}</h2>

// //       <p
// //         className={
// //           expanded ? "creator-description expanded" : "creator-description"
// //         }
// //       >
// //         {creator.description}
// //       </p>

// //       {creator.description.length > 160 && (
// //         <button
// //           type="button"
// //           className="read-more-button"
// //           onClick={() => setExpanded(!expanded)}
// //         >
// //           {expanded ? "See less" : "See more"}
// //         </button>
// //       )}

// //       <footer className="card-actions">
// //         <a href={creator.url} target="_blank" rel="noreferrer" role="button">
// //           <FaYoutube /> Visit Page
// //         </a>

// //         <Link to={`/creator/${creator.id}`} role="button" className="secondary">
// //           View Details
// //         </Link>

// //         <Link to={`/edit/${creator.id}`} role="button" className="contrast">
// //           Edit
// //         </Link>
// //       </footer>
// //     </article>
// //   );
// // }

// // export default Card;
