import React, { useState } from "react";

interface Props{
    value:string;
}
const Switches=({value}:Props)=>{
    const route=React.useMemo(()=>{
      switch(value){
        case "tab1":
          return <Tab1/>
          case "tab2":
          return <Tab2/>
          case "tab3":
          return <Tab3/>
          case "tab4":
          return <Tab4/>
      }
    },[value]);
    return route
  }
  export default Switches;
  
  const Tab1=()=>{
 
  
    const [data, setData] = useState(InitialData);
    const [editingId, setEditingId] = useState<any>(null);
    const [editingName, setEditingName] = useState('');
  
    const handleEditClick = (id:string, name:string) => {
      setEditingId(id);
      setEditingName(name);
    };
  
    const handleSaveClick = () => {
      setData(data?.map(item => (item._id === editingId ? { ...item, name: editingName } : item)));
      setEditingId(null);
      setEditingName('');
    };
  
    const handleCancelClick = () => {
      setEditingId(null);
      setEditingName('');
    };
    return(
      <div className="flex flex-row gap-2 w-full">
  <div className="flex flex-col gap-5 bg-[#e7e5e592] p-10 rounded-[7px] w-full">
        <h3 className=" text-[18px] font-[600] text-center">Create Main Category</h3>
          <div className="flex flex-col gap-1">
            <label className="text-[#303030] text-[15px] font-[600]">
              Main Category
            </label>
            <input
              className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1"
              type="text"
            />
          </div>
      
          <button className="bg-[#5a83bd] p-1 rounded-[8px] text-[15px] font-[600] text-[#f8f8f8]">
            save
          </button>
        </div>
        <div className="w-full max-h-[400px] overflow-auto mt-10 ">
      <ul className="list-none">
        {data.map(item => (
          <li key={item._id} className="flex items-center justify-between py-2 gap-3 px-4 bg-gray-100 mb-2 rounded">
            {editingId === item?._id ? (
              <>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="flex-1 mr-2 px-2 py-1 border rounded"
                />
                <button
                  onClick={handleSaveClick}
                  className="mr-2 px-4  bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelClick}
                  className="px-4  bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{item?.name}</span>
                <button
                  onClick={() => handleEditClick(item?._id, item?.name)}
                  className="px-4  bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
        </div>
    )
  }
  const Tab2=()=>{
    const [data, setData] = useState(InitialData); // Data can be fetched and set here
    const [editId, setEditId] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [showSubCategories, setShowSubCategories] = useState({});
  
    const handleEditClick = (id:string) => {
      setEditId(id);
      const subCategory = data.flatMap(cat => cat?.subCategories).find(sub => sub?._id === id);
      if (subCategory) {
        setEditValue(subCategory?.name);
      }
    };
  
    const handleSaveClick = (id:string) => {
      const newData = data?.map(cat => ({
        ...cat,
        subCategories: cat?.subCategories?.map(sub => sub?._id === id ? { ...sub, name: editValue } : sub)
      }));
      setData(newData);
      setEditId(null);
    };
  
    const handleCancelClick = () => {
      setEditId(null);
    };
  
    const toggleSubCategories = (categoryId:string) => {
      setShowSubCategories(prevState => ({
        ...prevState,
        [categoryId]: !prevState[categoryId] 
      }));
    };
    
    return(
      <div className="flex flex-row gap-2 w-full">
      <div className="flex flex-col gap-5 bg-[#e7e5e592] p-10 rounded-[7px] w-full">
      <h3 className=" text-[18px] font-[600] text-center">Create Sub-Category</h3>
      <div className="flex flex-col gap-1">
      <label className="text-[#303030] text-[15px] font-[600]">
            Main Category
          </label>
      <select className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1">
        <option value="main category">Main Category</option>
      </select>
      </div>
        <div className="flex flex-col gap-1">
          <label className="text-[#303030] text-[15px] font-[600]">
            Sub-Category
          </label>
          <input
            className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1"
            type="text"
          />
        </div>
    
        <button className="bg-[#5a83bd] p-1 rounded-[8px] text-[15px] font-[600] text-[#f8f8f8]">
          save
        </button>
      </div>
      <div className=" w-full mt-1 max-h-[400px] overflow-auto">
      
      <ul className="list-none w-full ">
      {data?.map((category) => (
        <div key={category._id} className="mb-4 bg-[#f8f8f8] p-1 rounded-[7px]">
          <div className="flex items-center justify-between ">
            <h2 className="text-sm font-bold">{category.name}</h2>
            <button onClick={() => toggleSubCategories(category._id)}>
              {showSubCategories[category._id] ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
          </div>
          {showSubCategories[category._id] && (
            <ul className="list-disc pl-6 mt-2 ">
              {category.subCategories.map((sub) => (
                <li key={sub._id} className="mb-2 flex flex-row justify-between">
                  {editId === sub._id ? (
                    <>
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="border px-2 py-1"
                      />
                      <button
                        onClick={() => handleSaveClick(sub._id)}
                        className="bg-green-500 text-white px-4  ml-2 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="bg-red-500 text-white px-4  ml-2 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="mr-2">{sub.name}</span>
                      <button
                        onClick={() => handleEditClick(sub._id)}
                        className="bg-blue-500 text-white px-4  rounded"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      </ul>
    </div>
      </div>
    )
  }
  const Tab3=()=>{
    const [data, setData] = useState(InitialData); // Data can be fetched and set here
    const [editId, setEditId] = useState<string>();
    const [editValue, setEditValue] = useState('');
    const [showSubCategories, setShowSubCategories] = useState({});
    const [showSubSubCategories, setShowSubSubCategories] = useState({});
  
    const handleEditClick = (id:string, value:string) => {
      setEditId(id);
      setEditValue(value);
    };
  
    const handleSaveClick = (id:string) => {
      const newData = data.map(cat => ({
        ...cat,
        subCategories: cat.subCategories.map(sub => ({
          ...sub,
          subSubCategories: sub.subSubCategories.map(subSub =>
            subSub._id === id ? { ...subSub, name: editValue } : subSub
          )
        }))
      }));
      setData(newData);
      setEditId(null);
    };
  
    const handleCancelClick = () => {
      setEditId(null);
    };
  
    const toggleSubCategories = (categoryId: string) => {
      setShowSubCategories((prevState: { [key: string]: boolean }) => ({
        ...prevState,
        [categoryId]: !prevState[categoryId]
      }));
    };
  
    const toggleSubSubCategories = (subCategoryId:string) => {
      setShowSubSubCategories((prevState :{[key:string]:boolean})=> ({
        ...prevState,
        [subCategoryId]: !prevState[subCategoryId]
      }));
    };
    return(
      <div className="flex flex-row gap-2 w-full">
      <div className="flex flex-col gap-5 bg-[#e7e5e592] p-10 rounded-[7px] w-full">
      <h3 className=" text-[18px] font-[600] text-center">Create Sub Sub-Category</h3>
      <div className="flex flex-col gap-1">
      <label className="text-[#303030] text-[15px] font-[600]">
            Main Category
          </label>
      <select className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1">
        <option value="main category">Main Category</option>
      </select>
      </div>
      <div className="flex flex-col gap-1">
      <label className="text-[#303030] text-[15px] font-[600]">
            Sub-Category
          </label>
      <select className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1">
        <option value="main category">Sub-Category</option>
      </select>
      </div>
        <div className="flex flex-col gap-1">
          <label className="text-[#303030] text-[15px] font-[600]">
            Sub Sub-Category
          </label>
          <input
            className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1"
            type="text"
          />
        </div>
    
        <button className="bg-[#5a83bd] p-1 rounded-[8px] text-[15px] font-[600] text-[#f8f8f8]">
          save
        </button>
      </div>
      <div className="  p-4 h-[400px] overflow-auto w-full">
      {data?.map((category) => (
        <div key={category?._id} className="mb-4 bg-[#f8f8f8] p-1 rounded-[7px]">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">{category.name}</h2>
            <button onClick={() => toggleSubCategories(category._id)}>
              {showSubCategories[category?._id] ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
          </div>
          {showSubCategories[category?._id] && (
            <ul className=" pl-6 mt-2 list-none">
              {category?.subCategories?.map((sub) => (
                <li key={sub._id} className="mb-2">
                  <div className="flex items-center justify-between mr-2">
                    <span className="">{sub?.name}</span>
                    <button onClick={() => toggleSubSubCategories(sub?._id)}>
                      {showSubSubCategories[sub?._id] ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {showSubSubCategories[sub?._id] && (
                    <ul className="list-disc pl-6 mr-2 mt-2">
                      {sub?.subSubCategories?.map((subSub) => (
                        <li key={subSub?._id} className="mb-2">
                          <div className="flex items-center justify-between">
                            {editId === subSub?._id ? (
                              <>
                                <input
                                  type="text"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="border px-2 py-1"
                                />
                                <button
                                  onClick={() => handleSaveClick(subSub?._id)}
                                  className="bg-green-500 text-white px-4  ml-2 rounded"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={handleCancelClick}
                                  className="bg-red-500 text-white px-4  ml-2 rounded"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <span className="mr-2">{subSub?.name}</span>
                                <button
                                  onClick={() => handleEditClick(subSub?._id, subSub?.name)}
                                  className="bg-blue-500 text-white px-4  rounded"
                                >
                                  Edit
                                </button>
                              </>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
      </div>
    )
  }
  const Tab4=()=>{
    
    const [data, setData] = useState(InitialData); // Data can be fetched and set here
  const [editId, setEditId] = useState<string>();
  const [editValue, setEditValue] = useState('');
  const [showSubCategories, setShowSubCategories] = useState({});
  const [showSubSubCategories, setShowSubSubCategories] = useState({});
  const [showInnerCategories, setShowInnerCategories] = useState({});

  const handleEditClick = (id:string, value:string) => {
    setEditId(id);
    setEditValue(value);
  };

  const handleSaveClick = (id:string, level:string) => {
 

     const newData = data.map(cat => ({
        ...cat,
        subCategories: cat.subCategories.map(sub => ({
          ...sub,
          subSubCategories: sub.subSubCategories.map(subSub => ({
            ...subSub,
            innerCategories: subSub.innerCategories.map(inner =>
              inner._id === id ? { ...inner, name: editValue } : inner
            )
          }))
        }))
      }));
    
    setData(newData);
    setEditId(null);
  };

  const handleCancelClick = () => {
    setEditId(null);
  };

  const toggleSubCategories = (categoryId:string) => {
    setShowSubCategories((prevState:{[key:string]:boolean}) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId]
    }));
  };

  const toggleSubSubCategories = (subCategoryId:string) => {
    setShowSubSubCategories((prevState:{[key:string]:boolean}) => ({
      ...prevState,
      [subCategoryId]: !prevState[subCategoryId]
    }));
  };

  const toggleInnerCategories = (innerCategoryId:string) => {
    setShowInnerCategories((prevState:{[key:string]:boolean}) => ({
      ...prevState,
      [innerCategoryId]: !prevState[innerCategoryId]
    }));
  };
    return (
      <div className="flex flex-row gap-2 w-full">
        <div className="flex flex-col gap-5 bg-[#e7e5e592] p-10 rounded-[7px] w-full">
          <h3 className=" text-[18px] font-[600] text-center">
            Create Inner Category
          </h3>
          <div className="flex flex-col gap-1">
            <label className="text-[#303030] text-[15px] font-[600]">
              Main Category
            </label>
            <select className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1">
              <option value="main category">Main Category</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[#303030] text-[15px] font-[600]">
              Sub-Category
            </label>
            <select className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1">
              <option value="main category">Sub-Category</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[#303030] text-[15px] font-[600]">
              Sub Sub-Category
            </label>
            <select className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1">
              <option value="main category">Sub Sub-Category</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[#303030] text-[15px] font-[600]">
              Inner Category
            </label>
            <input
              className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1"
              type="text"
            />
          </div>

          <button className="bg-[#5a83bd] p-1 rounded-[8px] text-[15px] font-[600] text-[#f8f8f8]">
            save
          </button>
        </div>
        <div className=" h-[400px] overflow-auto  w-full">
          {data?.map((category) => (
            <div key={category._id} className="mb-4 bg-[#f8f8f8] rounded-[7px] p-2">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold ">{category?.name}</h2>
                <button onClick={() => toggleSubCategories(category?._id)}>
                  {showSubCategories[category?._id] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {showSubCategories[category?._id] && (
                <ul className="list-non pl-6 mt-2 px-3">
                  {category?.subCategories?.map((sub) => (
                    <li key={sub?._id} className="mb-2">
                      <div className="flex items-center justify-between">
                        <span className="mr-2">{sub?.name}</span>
                        <button onClick={() => toggleSubSubCategories(sub._id)}>
                          {showSubSubCategories[sub?._id] ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 15l7-7 7 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      {showSubSubCategories[sub?._id] && (
                        <ul className="list-non pl-6 mt-2 p-3">
                          {sub?.subSubCategories?.map((subSub) => (
                            <li key={subSub._id} className="mb-2">
                              <div className="flex items-center justify-between">
                                <span className="mr-2">{subSub?.name}</span>
                                <button
                                  onClick={() =>
                                    toggleInnerCategories(subSub?._id)
                                  }
                                >
                                  {showInnerCategories[subSub?._id] ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 15l7-7 7 7"
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                      />
                                    </svg>
                                  )}
                                </button>
                              </div>
                              {showInnerCategories[subSub?._id] && (
                                <ul className="list-disc pl-6 mt-2">
                                  {subSub?.innerCategories?.map((inner) => (
                                    <li key={inner?._id} className="mb-2">
                                      <div className="flex items-center justify-between">
                                        {editId === inner?._id ? (
                                          <>
                                            <input
                                              type="text"
                                              value={editValue}
                                              onChange={(e) =>
                                                setEditValue(e.target.value)
                                              }
                                              className="border px-2 py-1"
                                            />
                                            <button
                                              onClick={() =>
                                                handleSaveClick(
                                                  inner?._id,
                                                  "innerCategory"
                                                )
                                              }
                                              className="bg-green-500 text-white px-4  ml-2 rounded"
                                            >
                                              Save
                                            </button>
                                            <button
                                              onClick={handleCancelClick}
                                              className="bg-red-500 text-white px-4 ml-2 rounded"
                                            >
                                              Cancel
                                            </button>
                                          </>
                                        ) : (
                                          <>
                                            <span className="mr-2">
                                              {inner?.name}
                                            </span>
                                            <button
                                              onClick={() =>
                                                handleEditClick(
                                                  inner?._id,
                                                  inner?.name
                                                )
                                              }
                                              className="bg-blue-500 text-white px-4  rounded"
                                            >
                                              Edit
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const InitialData=[
    {
      _id: "60d5ec49e1b2f2f0d9e1f001",
      name: "Tech",
      subCategories: [
        {
          _id: "60d5ec49e1b2f2f0d9e1f002",
          name: "Programming",
          subSubCategories: [
            {
              _id: "60d5ec49e1b2f2f0d9e1f003",
              name: "JavaScript",
              innerCategories: [
                { _id: "60d5ec49e1b2f2f0d9e1f004", name: "ES6" },
                { _id: "60d5ec49e1b2f2f0d9e1f005", name: "Node.js" }
              ]
            },
            {
              _id: "60d5ec49e1b2f2f0d9e1f006",
              name: "Python",
              innerCategories: [
                { _id: "60d5ec49e1b2f2f0d9e1f007", name: "Django" },
                { _id: "60d5ec49e1b2f2f0d9e1f008", name: "Flask" }
              ]
            }
          ]
        }
      ]
    },
    {
      _id: "60d5ec49e1b2f2f0d9e1f009",
      name: "Health",
      subCategories: [
        {
          _id: "60d5ec49e1b2f2f0d9e1f00a",
          name: "Nutrition",
          subSubCategories: [
            {
              _id: "60d5ec49e1b2f2f0d9e1f00b",
              name: "Vitamins",
              innerCategories: [
                { _id: "60d5ec49e1b2f2f0d9e1f00c", name: "Vitamin C" },
                { _id: "60d5ec49e1b2f2f0d9e1f00d", name: "Vitamin D" }
              ]
            },
            {
              _id: "60d5ec49e1b2f2f0d9e1f00e",
              name: "Minerals",
              innerCategories: [
                { _id: "60d5ec49e1b2f2f0d9e1f00f", name: "Calcium" },
                { _id: "60d5ec49e1b2f2f0d9e1f010", name: "Magnesium" }
              ]
            }
          ]
        }
      ]
    },
    {
      _id: "60d5ec49e1b2f2f0d9e1f011",
      name: "Finance",
      subCategories: [
        {
          _id: "60d5ec49e1b2f2f0d9e1f012",
          name: "Personal Finance",
          subSubCategories: [
            {
              _id: "60d5ec49e1b2f2f0d9e1f013",
              name: "Saving",
              innerCategories: [
                { _id: "60d5ec49e1b2f2f0d9e1f014", name: "Budgeting" },
                { _id: "60d5ec49e1b2f2f0d9e1f015", name: "Emergency Funds" }
              ]
            },
            {
              _id: "60d5ec49e1b2f2f0d9e1f016",
              name: "Investing",
              innerCategories: [
                { _id: "60d5ec49e1b2f2f0d9e1f017", name: "Stocks" },
                { _id: "60d5ec49e1b2f2f0d9e1f018", name: "Bonds" }
              ]
            }
          ]
        }
      ]
    },
    {
      _id: "60d5ec49e1b2f2f0d9e1f019",
      name: "Education",
      subCategories: [
        {
          _id: "60d5ec49e1b2f2f0d9e1f01a",
          name: "Online Courses",
          subSubCategories: [
            {
              _id: "60d5ec49e1b2f2f0d9e1f01b",
              name: "Programming",
              innerCategories: [
                { _id: "60d5ec49e1b2f2f0d9e1f01c", name: "JavaScript" },
                { _id: "60d5ec49e1b2f2f0d9e1f01d", name: "Python" }
              ]
            },
            {
              _id: "60d5ec49e1b2f2f0d9e1f01e",
              name: "Design",
              innerCategories: [
                { _id: "60d5ec49e1b2f2f0d9e1f01f", name: "Graphic Design" },
                { _id: "60d5ec49e1b2f2f0d9e1f020", name: "UI/UX Design" }
              ]
            }
          ]
        }
      ]
    },
    {
      _id: "60d5ec49e1b2f2f0d9e1f021",
      name: "Travel",
      subCategories: [
        {
          _id: "60d5ec49e1b2f2f0d9e1f022",
          name: "Destinations",
        
        }
      ]
    }
  ]
  