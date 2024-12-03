
'use client'
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
const ProductsFilter = () => {
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
        setFilterObject(prev=> prev.map((v,i)=>
            v.type==="normal" &&
                v.prop === prop ?
                {...v, isOpen: !v.isOpen}:v
        ));
    }
    return (
        <>
            {
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
                        {/* sub filter */}
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
            }
        </>
    )
}

export default ProductsFilter;