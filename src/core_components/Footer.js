import "./Footer.scss";

export default function Footer() {
  return (
    <footer>
      <div className="logo">
        <img
          className={`logo`}
          src={
            "https://cdn.discordapp.com/attachments/961665882671677493/1084136104409714688/logo.png"
          }
          alt=""
        />
        <div className={`logo-name`}>LEGiON Portal</div>
      </div>
      <div className="footer-links">
        <div>About</div>
        <div>Developers</div>
        <div>Kids Edition</div>
        <div>Terms</div>
        <div>FAQ</div>
        <div>Contact</div>
      </div>
    </footer>
  );
}
