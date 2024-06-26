import EditICONSVG from "../assets/SVG/editICON";
import DeleteICONSVG from "../assets/SVG/deleteICON";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const navigate = useNavigate();
  const teamMembers = [
    {
      name: "Olivia Rhye",
      age: 31,
      job: "Product Design",
      email: "olivia@gmail.com",
      username: "@olivia",
    },
    {
      name: "Phoenix Baker",
      age: 18,
      job: "Software Engineer",
      email: "phoenix@gmail.com",
      username: "@phoenix",
    },
    {
      name: "Lana Steiner",
      age: 26,
      job: "Graphic Design",
      email: "lana26@gmail.com",
      username: "@lana",
    },
    {
      name: "Demi Wilkison",
      age: 20,
      job: "Targetologist",
      email: "demi20@gmail.com",
      username: "@demi",
    },
    {
      name: "Candice Wu",
      age: 24,
      job: "UX/UI Designer",
      email: "cardice@gmail.com",
      username: "@cardice",
    },
    {
      name: "Natali Craig",
      age: 19,
      job: "Motion Designer",
      email: "natali@gmail.com",
      username: "@natali",
    },
    {
      name: "Drew Cano",
      age: 26,
      job: "Business Analytic",
      email: "drew02@gmail.com",
      username: "@drew",
    },
    {
      name: "Orlando Diggs",
      age: 28,
      job: "Interior Designer",
      email: "orlando@gmail.com",
      username: "@orlando",
    },
  ];
  return (
    <div className="flex justify-center p-4 w-full">
      <div className="w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="">
              <tr className="bg-gray-100 flex flex-row justify-between px-4">
                <th>Image</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Posted At</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {teamMembers.map((member, index) => (
                <tr
                  key={index}
                  className="group hover:bg-gray-50 flex flex-row justify-between   border-b px-4"
                >
                  <td className="py-2 px-4  flex items-center">
                    {" "}
                    <img
                      src={`https://i.pravatar.cc/150?img=${index + 1}`}
                      alt={member.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                  </td>
                  <td className="py-2 px-4 ">{member.name}</td>

                  <td className="py-2 px-4 ">20/02/2024</td>
                  <td className="py-2 px-4  flex gap-5 space-x-2">
                    <button className="">
                      <DeleteICONSVG heignt={20} width={20} fill={"#fe2828"} />
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/update-blog/${"hghg&gyyv7bh88b"}`)
                      }
                    >
                      <EditICONSVG heignt={20} width={20} fill={"#5b5a5a"} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default BlogList;
