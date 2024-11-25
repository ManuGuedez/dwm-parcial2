export default function useDeleteData(url) {
  const deleteData = async (data) => {
    try {
      const response = await fetch(url + `/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to delete the data.");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error deleting data: ", error);
      return false;
    }
  };
  return deleteData;
}
