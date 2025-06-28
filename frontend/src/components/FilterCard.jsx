import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bengaluru", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Role",
        array: [
            "Frontend Developer",
            "Backend Developer",
            "FullStack Developer",
            "DevOps Engineer",
            "QA Engineer",
            "UI/UX Designer",
            "Data Scientist",
            "Product Manager"
        ]
    },
    {
        filterType: "Tech Stack",
        array: [
            "MERN",
            "Spring Boot",
            "PHP",
            "WordPress",
            "Django",
            "Flutter",
            "React Native",
            "Angular",
        ]
    }
];


const FilterCard = ({ search, setSearch }) => {
    const changeHandler = (value) => {
        setSearch(value);
    }

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={search} onValueChange={changeHandler}>
                {filterData.map((data, index) => (
                    <div key={index}>
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <div className='flex items-center space-x-2 my-2' key={itemId}>
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

export default FilterCard;
