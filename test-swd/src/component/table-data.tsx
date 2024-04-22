import React, { useState, useEffect } from "react";
import { Button, Checkbox, Table } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useSelector } from "react-redux";
import { RootState } from "../redux-store";

interface DataType {
  key: React.Key;
  name: string;
  gender: string;
  phoneNumber: string;
  national: string;
  selected: boolean;
}

export const TableData: React.FC = () => {
  const formData = useSelector((state: RootState) => state.form.formData);  
  const [data, setData] = useState<DataType[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sortedInfo, setSortedInfo] = useState<{
    columnKey: string | null;
    order: "ascend" | "descend" | null;
  }>({ columnKey: null, order: null });

  const fetchDataFromLocalStorage = () => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const parsedData: DataType[] = JSON.parse(storedData).map(
        (item: DataType) => ({ ...item, selected: false, key: item.key })
      );
      setData(parsedData);
    }
  };

  useEffect(() => {
    fetchDataFromLocalStorage();
  }, [formData]);

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    console.log("Various parameters", pagination, filters, sorter);
    setSortedInfo({ columnKey: sorter.columnKey, order: sorter.order });
  };

  const handleSelectAll = (e: CheckboxChangeEvent) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    const updatedData = data.map((item) => ({ ...item, selected: isChecked }));
    setData(updatedData);
  };

  const handleRowSelectionChange = (record: DataType) => {
    const newData = data.map((item) =>
      item.key === record.key ? { ...item, selected: !item.selected } : item
    );
    setData(newData);
  };

  const handleDeleteSelected = () => {
    const newData = data.filter((item) => !item.selected);
    setData(newData);
    localStorage.setItem("formData", JSON.stringify(newData));
  };

  const handleDeleteRow = (record: DataType) => {
    const newData = data.filter((item) => item.key !== record.key);
    setData(newData);
    localStorage.setItem("formData", JSON.stringify(newData));
  };

  const rowSelection = {
    onSelect: handleRowSelectionChange,
    selectedRowKeys: data
      .filter((item) => item.selected)
      .map((item) => item.key),
  };

  const columns = [
    {
      title: "ชื่อ",
      dataIndex: "name",
      key: "name",
      sorter: (a: DataType, b: DataType) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "เพศ",
      dataIndex: "gender",
      key: "gender",
      sorter: (a: DataType, b: DataType) => a.gender.localeCompare(b.gender),
      sortOrder: sortedInfo.columnKey === "gender" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "หมายเลขโทรศัพท์",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: (a: DataType, b: DataType) =>
        a.phoneNumber.localeCompare(b.phoneNumber),
      sortOrder:
        sortedInfo.columnKey === "phoneNumber" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "สัญชาติ",
      dataIndex: "national",
      key: "national",
      sorter: (a: DataType, b: DataType) =>
        a.national.localeCompare(b.national),
      sortOrder: sortedInfo.columnKey === "national" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "จัดการ",
      dataIndex: "action",
      key: "action",
      render: (_: string, record: DataType) => (
        <Button onClick={() => handleDeleteRow(record)}>ลบ</Button>
      ),
    },
  ];

  return (
    <div className="table">
      <div className="buttonDelete">
        <Checkbox onChange={handleSelectAll}>เลือกข้อมูลทั้งหมด</Checkbox>
        <Button onClick={handleDeleteSelected}>ลบข้อมูล</Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        onChange={handleChange}
      />
    </div>
  );
};
