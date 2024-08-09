import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useAuth } from "@/context/auth-context";
import { useRegistrations } from "@/context/registration-context";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { toast } from "sonner";

function RegistrationPage() {
  const { registrations, loading } = useRegistrations();
  const { currentUserDetails } = useAuth();

  console.log(registrations)

  function downloadRegistrationPDF() {
    const doc = new jsPDF();

    const img = new Image();
    img.src = Logo;

    img.onload = () => {
      doc.addImage(img, "PNG", 10, 10, 35, 35);

      doc.setFontSize(14);
      doc.text(
        "KWAME NKRUMAH UNIVERSITY OF SCIENCE AND TECHNOLOGY, KUMASI",
        10,
        50,
        { align: "left" }
      );
      doc.setFontSize(12);
      doc.text("COURSE REGISTRATION", 10, 55, {
        align: "left",
      });

      doc.setFontSize(10);
      doc.text(`Name: ${currentUserDetails.name}`, 10, 70);
      doc.text(`Index Number: ${currentUserDetails.index_number}`, 10, 75);

      doc.text(`Year: ${currentUserDetails.year}`, 10, 80);

      doc.text(`Date/time Printed: ${new Date().toLocaleString()}`, 10, 85);

      let yPosition = 100;

      if (registrations && registrations.length > 0) {
        doc.setFontSize(12);
        doc.text("Registered Courses", 10, yPosition);
        yPosition += 10;

        const tableColumnHeaders = ["Course Code", "Course Name", "Credits"];
        const tableRows = [];

        registrations.forEach((item) => {
          item.courses.forEach((course) => {
            tableRows.push([course.course_code, course.course_name, course.hours_per_week]);
          });
        });

        doc.autoTable({
          startY: yPosition,
          head: [tableColumnHeaders],
          body: tableRows,
        });

        yPosition = doc.autoTable.previous.finalY + 10; // Move yPosition below the table

        doc.setFontSize(10);
        doc.text(
          `Credits registered: ${registrations[0].courses.reduce(
            (acc, item) => acc + item.hours_per_week,
            0
          )} `,
          10,
          yPosition
        );
        yPosition += 10;
        doc.text(
          `Number of subjects: ${registrations.reduce(
            (acc, item) => acc + item.courses.length,
            0
          )}`,
          10,
          yPosition
        );
      } else {
        doc.text("No registrations found.", 10, yPosition);
      }

      // Footer
      yPosition += 20;
      doc.setFontSize(12);
      doc.text("Academic Supervisor/ Registration Officer", 10, yPosition);
      doc.text("Student's Signature", 150, yPosition);
      yPosition += 10;
      doc.text(
        "REGISTRATION IS ONLY VALID AFTER BIOMETRIC VERIFICATION",
        10,
        yPosition
      );

      doc.save(`${currentUserDetails.name}-COURSE REGISTRATION.pdf`);
    };

    img.onerror = (error) => {
      toast.error("There was an error downloading the PDF.");
      console.error("Error loading image:", error);
    };
  }

  return (
    <div>
      {loading ? (
        <Loader variant="secondary" />
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <h3>Registration</h3>
          </div>
          <div className="flex flex-col lg:flex-row my-5 gap-5">
            {/* Left */}
            <div className="w-full lg:w-[50%]">
              <div className="border rounded-md">
                <div className="flex justify-between items-center p-5">
                  <h4>Course Registration</h4>
                  <Link to={`/registration/new`}>
                    <Button>Register</Button>
                  </Link>
                </div>
                <div id="registrations-section">
                  {registrations &&
                    registrations.map((item, index) => (
                      <div key={index}>
                        <div>
                          <h5 className="border-b p-5">
                            Year {item.year}, Sem {item.semester}
                          </h5>
                          <div>
                            {item.courses.map((course, courseIndex) => (
                              <div
                                className="border-b p-5 my-2"
                                key={course.course_code + courseIndex}
                              >
                                <p>{course.course_name}</p>
                                <p>{course.course_code}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <br />
                <div className="p-5">
                  {registrations && registrations.length > 0 && (
                    <Button
                      className="w-full"
                      onClick={downloadRegistrationPDF}
                    >
                      Download Registration
                    </Button>
                  )}
                </div>
              </div>
            </div>
            {/* Right */}
            <div className="w-full lg:w-[50%] flex flex-col gap-5">
              <div className="border p-5 rounded-md">
                <h4>Biometric Registration</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrationPage;
