import React, { useEffect, useState } from 'react'
import { MdOutlineAdd } from "react-icons/md";
import { message } from 'antd';
import { FiEdit } from "react-icons/fi"
import { RiDeleteBin6Line } from 'react-icons/ri'

// to get the data from Local Storage

const getLocalItems = () => {
    const list = localStorage.getItem('lists')
    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    }
    else {
        return [];
    }
}

const ToDoList = () => {
    const [inputItem, setInputItem] = useState();
    const [items, setItems] = useState(getLocalItems());
    const [toggleEditbtn, setToggleEditbtn] = useState(true);
    const [ideditItems, setIdEditItems] = useState(null);

    const InputItemValue = (e) => {
        setInputItem(e.target.value);
    }

    const AddItems = () => {
        if (!inputItem) {
            message.warning('Please write your item')
        }
        else if (inputItem && !toggleEditbtn) {
            setItems(
                items.map((elem) => {
                    console.log(elem);
                    if (elem.id === ideditItems) {
                        return { ...elem, name: inputItem }
                    }
                    return elem;
                })
            )
            setToggleEditbtn(true);
            setInputItem("");
            setIdEditItems(null);
            message.success("Item edit successful")
        }
        else {
            const allItems = { id: new Date().getTime().toString(), name: inputItem }
            setItems((prevItems) => {
                return [...prevItems, allItems]
            })
            setInputItem("");
            message.success("Item add Successful")
        }
    }

    const EditItems = (id) => {
        let newEditArr = items.find((elem) => {
            return elem.id === id;
        })
        setToggleEditbtn(false);
        setInputItem(newEditArr.name);
        setIdEditItems(id);
    }

    const DeleteItems = (i) => {
        setItems((prevData) => prevData.filter((val) => val.id !== i));
        message.success("Item delete successful")
    }
    const DeleteAllItems = () => {
        setItems([])
        message.success("All items deleted")
    }

        const handlerKeyDown = (e) => {
            if (e.key === "Enter") {
            AddItems();
          }
        };

    // Items add to the Loacal Storage

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items));
    }, [items])

    return (
        <div className='max-w-[400px] mx-auto min-h-[500px] py-4 px-8 my-6  md:mt-24  md:bg-black rounded-lg  md:shadow-lg '>
            <h1 className=' text-3xl md:text-4xl tracking-[2px] font-Merriweather text-center my-6 text-white font-bold'>ToDoList</h1>
            <div className='relative mb-6'>
                <input className='w-full py-2 pl-4 rounded-full  outline-none pr-12 border-red-800'
                    type="text"
                    placeholder='Add your list here'
                    value={inputItem}
                    onChange={InputItemValue}
                    onKeyDown={handlerKeyDown}
                />
                <div className=' absolute top-2 right-3 text-red-900'>
                    {
                        (toggleEditbtn) ? <MdOutlineAdd className=' cursor-pointer hover:text-green-600' size={25} fontWeight='bold' onClick={AddItems} /> : <FiEdit className=' text-green-600 cursor-pointer mt-[2px] pr-1' size={20} onClick={AddItems} />
                    }
                </div>
            </div>
            {
                items.map((data) => {
                    return (
                        <ul className='w-full p-2 bg-violet-900 text-white rounded-lg relative my-2 cursor-pointer overflow-hidden hover:bg-white  hover:text-violet-900 duration-300 container '>
                            <li className=' font-semibold flex items-center justify-between font-sans'>
                                <p className=' w-60 overflow-scroll pl-2'>{data.name}</p>
                                <div className='flex gap-4  pr-2'>
                                    <FiEdit className='editIcon' size={18} onClick={() => EditItems(data.id)} />
                                    <RiDeleteBin6Line className='deleteIcon' size={18} fontWeight='bold' onClick={() => DeleteItems(data.id)} />
                                </div>
                            </li>
                        </ul>)
                })
            }
            {
                (items.length > 0) ?
                    <div className='flex justify-center my-4'><button className='text-white w-[120px] bg-red-500  md:bg-violet-900 rounded-md py-2 hover:bg-red-500 duration-300' onClick={DeleteAllItems}>Clean All</button></div> : null
            }
        </div>
    )
}

export default ToDoList

