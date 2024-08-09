import Loader from "@/components/ui/loader";
import { useRegistrations } from "@/context/registration-context";
import { getFormattedDate } from "@/utils/time";
import { Book } from "lucide-react";
import { Link } from "react-router-dom";

function Dashboard() {
  const { registrations, loading } = useRegistrations();
  const recent_registration =
    registrations.length > 0
      ? registrations[registrations.length - 1]
      : { courses: [] };
  const recent_electives = recent_registration.courses.filter(
    (course) => course.is_elective
  );

  return (
    <>
      {loading ? (
        <Loader variant="secondary" />
      ) : (
        <div>
          {/* Top */}
          <div className="flex justify-between items-center">
            <div>
              <h3>Dashboard</h3>
            </div>
            <div>
              <p>{getFormattedDate()}</p>
            </div>
          </div>
          {/* Bottom */}
          <div className="flex flex-col lg:flex-row my-5 gap-5">
            {/* Left */}
            <div className="grid grid-cols-3 gap-5 w-full">
              <div className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                <dt>
                  <div className="absolute rounded-md bg-primary p-3">
                    <Book className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <p className="ml-16 truncate text-sm font-medium text-gray-500">
                    Registered Courses
                  </p>
                </dt>
                <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {recent_registration.courses.length}
                  </p>
                  <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                    <div className="text-sm">
                      <Link
                        to="/registration"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        View all
                        <span className="sr-only">
                          {" "}
                          Registered Courses stats
                        </span>
                      </Link>
                    </div>
                  </div>
                </dd>
              </div>
              <div className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                <dt>
                  <div className="absolute rounded-md bg-primary p-3">
                    <Book className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <p className="ml-16 truncate text-sm font-medium text-gray-500">
                    Registered Electives
                  </p>
                </dt>
                <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {recent_electives.length}
                  </p>
                  <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                    <div className="text-sm">
                      <Link
                        to="/registration"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        View all
                        <span className="sr-only">
                          {" "}
                          Registered Electives stats
                        </span>
                      </Link>
                    </div>
                  </div>
                </dd>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
