
'use client'
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
const ProductsFilter = ({ categories , onChange}) => {
    const [categoryFilters, setCategoryFilters] = useState([]);
    const createCategoryHierarchy = (categories) => {
        const categoryMap = {}; // To map category id to category object
        const rootCategories = []; // To store root categories

        // First, map all categories by their id
        categories.forEach(category => {
            categoryMap[category.id] = { ...category, children: [] };
        });

        // Then, loop through each category to add it as a child to its parent (if applicable)
        categories.forEach(category => {
            if (category.parent_id === 0) {
                // If parent_id is null, it's a root category
                rootCategories.push(categoryMap[category.id]);
            } else {
                // If parent existas, add this category to its parent's children
                if (categoryMap[category.parent_id]) {
                    categoryMap[category.parent_id].children.push(categoryMap[category.id]);
                }
            }
        });

        return rootCategories;
    }

    useEffect(() => {
        if (categories.length > 0) {
            const cat_root = createCategoryHierarchy(categories.filter(i=> i.is_visible===true).map(i => ({
                id: i.category_id,
                name: i.name,
                count: 0,
                checked: false,
                parent_id: i.parent_id
            })))
            console.log("catHierarchy", cat_root);
            setCategoryFilters(cat_root);
        }
    }, [categories]);

    const Filters = [
        { type: "featured", prop: "ffilter1", label: "Featured Filter 1", count: 252, checked: true, isOpen: false, sub_filters: [] },
        { type: "featured", prop: "ffilter2", label: "Featured Filter 2", count: 55, checked: false, isOpen: false, sub_filters: [] },
        {
            type: "normal", prop: "filter1", label: "Filter", count: 0, checked: 0, isOpen: true, sub_filters: [
                { type: "normal", prop: "f1_filter1", label: "Filter", count: 55, checked: true, sub_filters: [] },
                { type: "normal", prop: "f1_filter2", label: "Filter", count: 72, checked: true, sub_filters: [] },
                { type: "normal", prop: "f1_filter3", label: "Filter", count: 10, checked: true, sub_filters: [] },
                { type: "normal", prop: "f1_filter4", label: "Filter", count: 3, checked: true, sub_filters: [] },
                { type: "normal", prop: "f1_filter5", label: "Filter", count: 120, checked: true, sub_filters: [] },
            ]
        },
        {
            type: "normal", prop: "filter2", label: "Filter", count: 0, checked: 0, isOpen: false, sub_filters: [
                { type: "normal", prop: "f2_filter1", label: "Filter", count: 55, checked: true, sub_filters: [] },
                { type: "normal", prop: "f2_filter2", label: "Filter", count: 72, checked: true, sub_filters: [] },
                { type: "normal", prop: "f2_filter3", label: "Filter", count: 10, checked: true, sub_filters: [] },
                { type: "normal", prop: "f2_filter4", label: "Filter", count: 3, checked: true, sub_filters: [] },
                { type: "normal", prop: "f2_filter5", label: "Filter", count: 120, checked: true, sub_filters: [] },
            ]
        },
        {
            type: "normal", prop: "filter3", label: "Filter", count: 0, checked: 0, isOpen: false, sub_filters: [
                { type: "normal", prop: "f3_filter1", label: "Filter", count: 55, checked: true, sub_filters: [] },
                { type: "normal", prop: "f3_filter2", label: "Filter", count: 72, checked: true, sub_filters: [] },
                { type: "normal", prop: "f3_filter3", label: "Filter", count: 10, checked: true, sub_filters: [] },
                { type: "normal", prop: "f3_filter4", label: "Filter", count: 3, checked: true, sub_filters: [] },
                { type: "normal", prop: "f3_filter5", label: "Filter", count: 120, checked: true, sub_filters: [] },
            ]
        },
        {
            type: "normal", prop: "filter4", label: "Filter", count: 0, checked: 0, isOpen: false, sub_filters: [
                { type: "normal", prop: "f3_filter1", label: "Filter", count: 55, checked: true, sub_filters: [] },
                { type: "normal", prop: "f3_filter2", label: "Filter", count: 72, checked: true, sub_filters: [] },
                { type: "normal", prop: "f3_filter3", label: "Filter", count: 10, checked: true, sub_filters: [] },
                { type: "normal", prop: "f3_filter4", label: "Filter", count: 3, checked: true, sub_filters: [] },
                { type: "normal", prop: "f3_filter5", label: "Filter", count: 120, checked: true, sub_filters: [] },
            ]
        },
        {
            type: "normal", prop: "filter5", label: "Filter", count: 0, checked: 0, isOpen: false, sub_filters: [
                { type: "normal", prop: "f1_filter1", label: "Filter", count: 55, checked: true, sub_filters: [] },
                { type: "normal", prop: "f1_filter2", label: "Filter", count: 72, checked: true, sub_filters: [] },
                { type: "normal", prop: "f1_filter3", label: "Filter", count: 10, checked: true, sub_filters: [] },
                { type: "normal", prop: "f1_filter4", label: "Filter", count: 3, checked: true, sub_filters: [] },
                { type: "normal", prop: "f1_filter5", label: "Filter", count: 120, checked: true, sub_filters: [] },
            ]
        },
    ];
    const [filterObject, setFilterObject] = useState(Filters);
    const [activeFilter, setActiveFilter] = useState(null);
    const handleFilterCheckboxChange = (e, prop) => {
        console.log(prop, e);
    }
    const handleFilterToggle = (prop) => {
        setFilterObject(prev => prev.map((v, i) =>
            v.type === "normal" &&
                v.prop === prop ?
                { ...v, isOpen: !v.isOpen } : v
        ));
    }

    const handleCategoryFiltersChange = (e) => {
        const { value } = e.target;
        console.log(e);
        setCategoryFilters(prev => {
            const newValue = prev.map(i => parseInt(i.id) === parseInt(value) ? ({ ...i, checked: !i.checked }) : i)
            onChange(newValue.filter(i=> i.checked===true).map(i=> i.id));
            return newValue;
        });
    }



    return (
        <>
            {
                categoryFilters && categoryFilters.length > 0 && categoryFilters.map((i, index) =>
                    <div key={`categories-filter-${index}`} onClick={() => handleCategoryFiltersChange({ target: { value: i.id } })} value={i.id} className="cursor-pointer border-b">
                        <div className="flex justify-between items-center h-[70px] p-[5px]">
                            <div className="font-bold">
                                {i.name}
                            </div>
                            <div className="relative w-[20px] h-[20px]">
                                <input type="checkbox" value={i.id} checked={i.checked} />
                                {
                                    i.checked && <div className="absolute top-0 left-0">
                                        <Icon icon="bx:check" width="18" height="18" className="ml-[1px] text-white" />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                )
            }
            {/* {
                filterObject.map((v, i) => (<div key={`filter-${i}`} className="py-[15px] border-b">
                        <div className={`flex items-center justify-between ${v.type==='normal' ? 'cursor-pointer':''}`} onClick={()=>{handleFilterToggle(v.prop)}}>
                            <div className="text-[18px] font-bold">
                                {v.label}
                            </div>
                            {
                                v.type === "featured" ?
                                    <div className="flex items-center gap-[4px]">
                                        <div className="relative">
                                                <input type="checkbox"  checked={v.checked} onChange={(e)=>handleFilterCheckboxChange(e,v.prop)}/>
                                                {
                                                    v.checked && <div className="absolute top-0 left-0">
                                                        <Icon icon="bx:check" width="18" height="18" className="text-white"/>
                                                    </div>
                                                }
                                            </div>

                                        <div>
                                            ({v.count})
                                        </div>
                                    </div>
                                    :
                                    <div className="flex items-center pr-[15px]">
                                        {
                                            v.isOpen ?
                                                <Icon icon="solar:alt-arrow-up-line-duotone" />
                                                :
                                                <Icon icon="solar:alt-arrow-down-line-duotone" />
                                        }
                                    </div>
                            }
                        </div>
                        {
                            v.isOpen === true &&
                            <div className="py-[8px]">
                                {
                                    v.sub_filters.map((v1, i1) => (
                                        <div key={`filter-${i}-sf-${i1}`} className="px-[15px] py-[8px] flex items-center justify-between">
                                            <div>
                                                {v1.label} ({v1.count})
                                            </div>
                                            <div className="relative">
                                                <input type="checkbox" name="" id="" checked={v1.checked} onChange={(e)=>handleFilterCheckboxChange(e,v1.prop)}/>
                                                {
                                                    v1.checked && <div className="absolute top-0 left-0">
                                                        <Icon icon="bx:check" width="18" height="18" className="text-white"/>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>
                ))
            } */}
        </>
    )
}

export default ProductsFilter;