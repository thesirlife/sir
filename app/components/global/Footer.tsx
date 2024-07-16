import { OpenInNew } from "@mui/icons-material";
import Button from "./Button";
import dayjs from "dayjs";

const Footer = () => {
  return (
    <footer className="bg-navy-primary py-8 px-4">
      <div className="flex flex-col container m-auto">
        <div className="flex flex-col sm:flex-row gap-4 pb-6 justify-center items-center">
          <h3 className="text-xl font-bold">Want To Help Us Improve SIR?</h3>
          <Button variant="contained" color="warning" href="https://www.thesirlife.com/user-portal-feedback" target="_blank">
            Share Feedback
          </Button>
        </div>
        <div className="border-t-2 border-gray-600 pt-6 flex justify-center items-center">
          &copy; SIR {dayjs().year()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
