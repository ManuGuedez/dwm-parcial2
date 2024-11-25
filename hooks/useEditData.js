export default function useEditData(url) {
  const editData = async (data) => {
    try {
      const response = await fetch(url + `/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const updatedData = await response.json();
      return updatedData;
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };
  return editData;
}
