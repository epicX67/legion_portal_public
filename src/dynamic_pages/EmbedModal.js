"use client";
import "./ShareModal.scss";
import "./EmbedModal.scss";
import { useRouter } from "next/navigation";

export default function EmbedModal({ show, toggle, url }) {
  const router = useRouter();

  return (
    show && (
      <div className="embed-cont">
        <div
          className="modal-touch-blocker"
          onClick={() => toggle(!show)}
        ></div>
        <div className="share-modal">
          <div className="title">Embed</div>
          <textarea type={"text"} readOnly={true} value={url} />
          <div className="bottom-bar">
            <button
              className="copyToClipboard"
              onClick={() => {
                router.push(url);
              }}
            >
              Open
            </button>
            <button onClick={() => toggle(!show)}>Close</button>
          </div>
        </div>
      </div>
    )
  );
}
