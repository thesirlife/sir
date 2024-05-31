import { TextField, Divider } from "@mui/material";
import Button from "../global/Button";

const RegisterForm = () => {
  return (
    <div>
      <form className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-3 [&>*]:max-w-[260px]">
          <TextField
            id="outlined-basic"
            label="Email Address"
            placeholder="enter email"
          />
          <TextField
            id="outlined-basic"
            label="First Name"
            placeholder="enter first name"
          />
          <TextField
            id="outlined-basic"
            label="New Password"
            placeholder="create your password"
            helperText="At least 8 characters, more is better."
          />
        </div>
        <Divider className="my-8" flexItem />
        <Button variant="contained" color="warning">
          Finish Setup
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
