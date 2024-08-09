import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/context/auth-context";
import { db } from "@/lib/firebase";
import { sha256 } from "crypto-hash";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import data from "../../db/courses.json";

function NewRegistrationPage() {
  const navigate = useNavigate();
  const { currentUser, currentUserDetails } = useAuth();
  const [year, setYear] = useState(1);
  const [semester, setSemester] = useState(1);
  const [error, setError] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  useEffect(() => {
    if (currentUserDetails && currentUserDetails.hasRegistered) {
      navigate("/registration");
    }
  }, [currentUserDetails, navigate]);

  useEffect(() => {
    // Automatically select required courses when year or semester changes
    const courses = data[`year_${year}`][`semester_${semester}`];
    const requiredCourses = courses.filter((course) => !course.is_elective);
    setSelectedCourses(requiredCourses);
  }, [year, semester]);

  const generateTimetable = (courses) => {
    const timetable = courses.map((course) => {
      return {
        course_code: course.course_code,
        course_name: course.course_name,
        hours_per_week: course.hours_per_week,
        times: generateTimes(course.hours_per_week),
      };
    });
    return timetable;
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hoursOfDay = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
  ];

  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const generateTimes = (hours) => {
    const times = [];
    for (let i = 0; i < hours; i++) {
      const day = getRandomElement(daysOfWeek);
      const hour = getRandomElement(hoursOfDay);
      times.push(`${day} at ${hour}`);
    }
    return times;
  };

  const timetableExists = async (hash) => {
    const timetableRef = collection(db, "timetables");
    const timetableQuery = query(timetableRef, where("hash", "==", hash));
    const timetableDocSnap = await getDocs(timetableQuery);
    return !timetableDocSnap.empty;
  };

  async function handleRegisterCourses(e) {
    e.preventDefault();
    setIsSubmittingForm(true);
    setError("");

    try {
      if (selectedCourses.length < 5) {
        setError("Please select at least 5 courses to register.");
        return;
      }

      const timetable = generateTimetable(selectedCourses);
      const hash = await sha256(JSON.stringify(timetable));

      if (await timetableExists(hash)) {
        toast.success("Timetable already exists. Updating your profile.");
      } else {
        const timetableRef = collection(db, "timetables");
        await addDoc(timetableRef, {
          studentId: currentUser.uid,
          timetable,
          hash,
        });
        toast.success("Timetable generated and stored successfully!");
      }

      const userRef = collection(db, "users");
      const userQuery = query(userRef, where("uid", "==", currentUser.uid));
      const userDocSnap = await getDocs(userQuery);

      if (!userDocSnap.empty) {
        const userDocRef = userDocSnap.docs[0].ref;
        await updateDoc(userDocRef, {
          hasRegistered: true,
          year: year,
          timetable,
        });
      } else {
        setError("User document not found.");
        return;
      }

      const bookingsRef = collection(db, "registrations");

      await addDoc(bookingsRef, {
        year,
        semester,
        studentId: currentUser.uid,
        courses: selectedCourses,
        userId: currentUser.uid,
      });

      navigate("/registration");
    } catch (error) {
      console.log(error);
      setError("Failed to register courses. Please try again.");
    } finally {
      setIsSubmittingForm(false);
    }
  }

  const handleCourseSelection = (course) => {
    const isSelected = selectedCourses.some(
      (selectedCourse) => selectedCourse.course_code === course.course_code
    );
    if (isSelected) {
      setSelectedCourses(
        selectedCourses.filter(
          (selectedCourse) => selectedCourse.course_code !== course.course_code
        )
      );
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const courses = data[`year_${year}`][`semester_${semester}`];

  if (!currentUserDetails) {
    return <Loader variant="secondary" />;
  }

  return (
    <div>
      <div className="max-w-screen-xl mx-auto">
        <div>
          <h3>Register for a Course</h3>
        </div>
        <br />
        <div>
          <div className="flex gap-5 items-center">
            <div>
              <Label>Year:</Label>
              <Select
                value={year.toString()}
                onValueChange={(value) => setYear(parseInt(value, 10))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select A Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">Year 1</SelectItem>
                    <SelectItem value="2">Year 2</SelectItem>
                    <SelectItem value="3">Year 3</SelectItem>
                    <SelectItem value="4">Year 4</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Semester:</Label>
              <Select
                value={semester.toString()}
                onValueChange={(value) => setSemester(parseInt(value, 10))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select A Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">Semester 1</SelectItem>
                    <SelectItem value="2">Semester 2</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            {error && (
              <div className="my-4 text-sm bg-red-200 px-4 py-2 rounded-md">
                <p className="text-center">{error}</p>
              </div>
            )}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="table-cell text-nowrap text-center">
                    Course Code
                  </TableHead>
                  <TableHead className="table-cell text-nowrap text-center">
                    Name
                  </TableHead>
                  <TableHead className="table-cell text-nowrap text-center">
                    Lecturer
                  </TableHead>
                  <TableHead className="table-cell text-nowrap text-center">
                    Credit Hours
                  </TableHead>
                  <TableHead className="table-cell text-nowrap text-center">
                    Elective?
                  </TableHead>
                  <TableHead className="table-cell text-nowrap text-center">
                    Register
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell className="table-cell text-nowrap text-center">
                      {course.course_code}
                    </TableCell>
                    <TableCell className="table-cell text-nowrap text-center">
                      {course.course_name}
                    </TableCell>
                    <TableCell className="table-cell text-nowrap text-center">
                      {course.lecturer}
                    </TableCell>
                    <TableCell className="table-cell text-nowrap text-center">
                      {course.hours_per_week}
                    </TableCell>
                    <TableCell className="table-cell text-nowrap text-center">
                      {course.is_elective ? "Yes" : "No"}
                    </TableCell>
                    <TableCell className="table-cell text-nowrap text-center">
                      {" "}
                      <Checkbox
                        type="checkbox"
                        checked={selectedCourses.some(
                          (selectedCourse) =>
                            selectedCourse.course_code === course.course_code
                        )}
                        onCheckedChange={() => handleCourseSelection(course)}
                        disabled={!course.is_elective}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <br />
            <div>
              <Button
                className="w-full"
                size={"sm"}
                disabled={isSubmittingForm}
                onClick={handleRegisterCourses}
              >
                {isSubmittingForm ? <Loader /> : <div>Register Courses</div>}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewRegistrationPage;
