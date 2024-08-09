import Loader from "@/components/ui/loader";
import { useAuth } from "@/context/auth-context";
import { convertData } from "@/utils/timetable";
import React from "react";

function Timetable() {
  const { currentUserDetails, loading } = useAuth();
  const timetable = currentUserDetails?.timetable || [];

  const formattedTTData = convertData(timetable);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div>
        <h3 className="text-center text-xl font-bold mb-4">Timetable</h3>
      </div>

      <div className="border divide-y">
        {Object.keys(formattedTTData).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-5 divide-x">
            {Object.keys(formattedTTData).map((day, index) => (
              <div key={index} className="">
                <h4 className="text-center text-sm lg:text-lg font-semibold border-b p-5 text-primary">
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </h4>
                <div className="">
                  {formattedTTData[day].map((item, idx) => (
                    <div key={idx} className="border-b text-center p-5">
                      <h5 className="font-semibold text-sm">{item.name}</h5>
                      <p className="text-sm">
                        {item.startTime} - {item.endTime}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-4">No timetable available</p>
        )}
      </div>
    </div>
  );
}

export default Timetable;
