import { API } from "@/api/requests";
import { useQuery } from "@tanstack/react-query";

export default function CustomersList() {
  const { data: users } = useQuery(API.USERS.FIND_ALL());

  return (
    <div className="W-full flex-col max-w-[1000px] items-center mx-auto text-gray-600">
      <h1 className="font-bold text-5xl text-blue-900 text-center">Clientes</h1>

      <section className="w-full flex flex-wrap mt-10 bg-white border rounded-lg shadow-md">
        {users
          ? users.map((user) => {
              return (
                <div
                  key={user._id}
                  className="w-full flex justify-between items-center p-5 border-b"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">{user.name}</span>
                    <span className="text-sm text-gray-500">{user.email}</span>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="font-bold">Fecha de registro</span>
                    <span className="text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              );
            })
          : null}
      </section>
    </div>
  );
}
