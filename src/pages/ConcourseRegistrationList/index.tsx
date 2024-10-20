import {
  useGetApplicationsQuery,
  useGetUserQuery,
} from "../../services/store.ts";

const columns = [
  ["N", "Номер"],
  ["id", "Id"],
  ["school_name", "Название школы"],
  ["teacher_name", "ФИО Учителя"],
  ["teacher_email", "email учителя"],
  ["class_3_section_1", "ФИО участника 3.1"],
  ["class_3_section_2", "ФИО участника 3.2"],
  ["class_3_section_3", "ФИО участника 3.3"],
  ["class_4_section_1", "ФИО участника 4.1"],
  ["class_4_section_2", "ФИО участника 4.2"],
  ["class_4_section_3", "ФИО участника 4.3"],
  ["class_4_section_4", "ФИО участника 4.4"],
  ["class_4_section_4", "ФИО участника 4.4"],
];

function ConcourseRegistrationList() {
  const { data } = useGetApplicationsQuery({});

  const { data: currentUser } = useGetUserQuery({});

  const applications = data?.data ?? [];

  if (currentUser?.data?.isAdmin)
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              {columns.map(([_, title], index) => (
                <th key={index} className="py-2 px-4 border-b border-gray-200">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applications?.map((application: any, rowIndex: number) => (
              <tr
                key={`${application?.id}_${rowIndex}`}
                className="hover:bg-gray-50"
              >
                {columns.map(([key, _], colIndex) => (
                  <td
                    key={colIndex}
                    className="py-2 px-4 border-b border-gray-200"
                  >
                    {colIndex === 0 ? rowIndex + 1 : application?.[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  return null;
}

export default ConcourseRegistrationList;
