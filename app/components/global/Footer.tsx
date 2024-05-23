import { OpenInNew } from "@mui/icons-material";
import Button from "./Button";

const Footer = () => {
  return (
    <footer>
      <div>
        <h3>Want To Help Us Improve SIR?</h3>
        <Button text="Open Survey" endIcon={<OpenInNew fontSize="small" />} />
      </div>
    </footer>
  );
};

export default Footer;
