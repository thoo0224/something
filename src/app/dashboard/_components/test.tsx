import { useOptimistic as useOptimisticReact } from "react";

type OptimisticAction = {
  type: "add" | "delete" | "update";
  data: any;
};

export function useOptimistic<
  Data,
  AddData,
  RemoveData,
  UpdateData,
  DataArray = Data[]
>(
  data: DataArray,
  options: {
    onAdd?: (state: DataArray, data: AddData) => DataArray;
    onRemove?: (state: DataArray, data: RemoveData) => DataArray;
  }
) {
  const [optimisticData, updateOptimisticData] = useOptimisticReact(
    data,
    (state: DataArray, action: OptimisticAction) => {
      console.log(action);
      if (action.type === "add" && options.onAdd)
        return options.onAdd(state, action.data);

      if (action.type === "delete" && options.onRemove)
        return options.onRemove(state, action.data);

      return state;
    }
  );

  return {
    optimisticData,
    addOptimistic: (data: AddData) =>
      updateOptimisticData({
        type: "add",
        data,
      }),
    removeOptimistic: (data: RemoveData) =>
      updateOptimisticData({
        type: "delete",
        data,
      }),
    updateOptimistic: (find: (x: Data) => boolean, update: Partial<Data>) => {
      if (optimisticData instanceof Array) {
        return optimisticData.map((item) =>
          find(item) ? { ...item, ...update } : item
        );
      }

      return optimisticData;
    },
  };
}
