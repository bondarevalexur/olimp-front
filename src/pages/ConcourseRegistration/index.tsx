import { useCallback, useEffect, useState } from "react";
import {
  useCreateApplicationMutation,
  useGetApplicationsQuery,
  useUpdateApplicationMutation,
} from "../../services/store.ts";
import Button from "../../components/Button";
import { toast } from "react-toastify";

function ConcourseRegistration() {
  const [formData, setFormData] = useState({
    school_name: null,
    teacher_name: null,
    teacher_email: null,
    class_3_section_1: null,
    class_3_section_2: null,
    class_3_section_3: null,
    class_4_section_1: null,
    class_4_section_2: null,
    class_4_section_3: null,
    class_4_section_4: null,
  } as any);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value || null });
  };

  const [updateApplication] = useUpdateApplicationMutation();
  const [createApplication] = useCreateApplicationMutation();
  const { data } = useGetApplicationsQuery({});

  useEffect(() => {
    if (data?.data?.id) {
      setFormData(data?.data);
    }
  }, [data?.data]);

  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      if (data?.data?.id) {
        updateApplication(formData)
          .then(() => {
            toast.success("Заявка обновлена");
          })
          .catch((err) => {
            toast.error(`Ошибка обновления ${err}`);
          });
      } else {
        createApplication(formData)
          .then(() => {
            toast.success("Заявка создана");
          })
          .catch((err) => {
            toast.error(`Ошибка создания ${err}`);
          });
      }
    },
    [formData, data?.data],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="m-10 p-4 bg-white shadow rounded-lg"
    >
      <fieldset className="grid grid-cols-3 gap-2 mb-8">
        <div>
          <label
            htmlFor="school_name"
            className="block text-gray-700 font-bold mb-2"
          >
            Название школы
          </label>
          <input
            type="text"
            id="school_name"
            name="school_name"
            value={formData.school_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="teacher_name"
            className="block text-gray-700 font-bold mb-2"
          >
            ФИО Учителя
          </label>
          <input
            type="text"
            id="teacher_name"
            name="teacher_name"
            value={formData.teacher_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="teacher_email"
            className="block text-gray-700 font-bold mb-2"
          >
            Email учителя
          </label>
          <input
            type="email"
            id="teacher_email"
            name="teacher_email"
            value={formData.teacher_email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-gray-700 font-bold m-auto mb-10">
          ФИО Участники
        </legend>
        <div className="grid grid-cols-3 gap-2 mb-8">
          {["3.1", "3.2", "3.3"].map((section) => (
            <div key={section}>
              <label
                htmlFor={`class_${section.replace(".", "_section_")}`}
                className="block text-gray-700 font-bold mb-2"
              >
                Секция {section}
              </label>
              <input
                type="text"
                id={`class_${section.replace(".", "_section_")}`}
                name={`class_${section.replace(".", "_section_")}`}
                value={formData[`class_${section.replace(".", "_section_")}`]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 mb-8">
          {["4.1", "4.2", "4.3", "4.4"].map((section) => (
            <div key={section}>
              <label
                htmlFor={`class_${section.replace(".", "_section_")}`}
                className="block text-gray-700 font-bold mb-2"
              >
                Секция {section}
              </label>
              <input
                type="text"
                id={`class_${section.replace(".", "_section_")}`}
                name={`class_${section.replace(".", "_section_")}`}
                value={formData[`class_${section.replace(".", "_section_")}`]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </fieldset>
      <Button type="submit" className="m-auto">
        Отправить
      </Button>
    </form>
  );
}

export default ConcourseRegistration;
