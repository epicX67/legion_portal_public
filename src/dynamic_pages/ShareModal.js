"use client";
import "./ShareModal.scss";
import {
  EmailShareButton,
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export default function ShareModal({ show, toggle, url }) {
  return (
    show && (
      <div className="share-cont">
        <div className="share-modal">
          <div className="title">Share</div>
          <div className="mode-list">
            <EmailShareButton
              url={url}
              subject="Check this game"
              body="Try this game"
            >
              <EmailIcon round={true} />
            </EmailShareButton>
            <FacebookShareButton url={url}>
              <FacebookIcon round={true} />
            </FacebookShareButton>
            <RedditShareButton url={url} title="Check out this game">
              <RedditIcon round={true} />
            </RedditShareButton>
            <TelegramShareButton url={url} title="Check out this game">
              <TelegramIcon round={true} />
            </TelegramShareButton>
            <TwitterShareButton url={url} title="Check out this game">
              <TwitterIcon round={true} />
            </TwitterShareButton>
            <WhatsappShareButton url={url} title="Check out this game">
              <WhatsappIcon round={true} />
            </WhatsappShareButton>
          </div>
          <div className="bottom-bar">
            <button onClick={() => toggle(!show)}>Close</button>
          </div>
        </div>
      </div>
    )
  );
}
