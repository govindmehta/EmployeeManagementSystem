import express from "express"
import { addEmployee, deleteEmployee, getEmployeeInfo, getEmployees, updateEmployee } from "../controllers/employeeController.js"
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const router = express.Router()

router.get("/", getEmployees)
router.post("/add",upload.single("profilePic"),addEmployee);
router.delete("/:id",deleteEmployee);
router.get("/:id",getEmployeeInfo);
router.put("/:id", upload.single("profilePic"), updateEmployee);


export default router;