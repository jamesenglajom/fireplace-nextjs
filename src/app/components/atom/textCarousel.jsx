import React, { Component } from "react";
import dynamic from "next/dynamic";
import { FluentChevronLeft, FluentChevronRight } from "../icons/lib";
import { useBreakpointValue } from "@/app/hooks/useBreakPointValue";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute z-[1] top-[50%] right-[0px] group">
      <div className="rounded-full shadow-md overflow-hidden group-hover:shadow-lg border">
        <div className="bg-white text-stone-200 opacity-50 group-hover:opacity-100">
          <FluentChevronRight color="black" />
        </div>
      </div>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute z-[1] top-[50%] left-[0px] group">
      <div className="rounded-full shadow-md overflow-hidden group-hover:shadow-lg border">
        <div className="bg-white text-stone-200 opacity-50 group-hover:opacity-100">
          <FluentChevronLeft color="black" />
        </div>
      </div>
    </div>
  );
}

class Slider extends Component {
  state = {
    isServer: true,
  };

  componentDidMount() {
    this.setState((state) => state.isServer && { isServer: false });
  }

  render() {
    const { settings, breakpoints, children } = this.props;
    const SliderRendered = dynamic(import("react-slick"), {
      ssr: this.state.isServer,
    });
    // const breakpoint_value = useBreakpointValue(breakpoints);

    const predefined = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    let merged = { ...predefined, ...settings };
    // if (breakpoints && breakpoint_value) {
    //   merged["slidesToShow"] = breakpoint_value;
    // }

    return <SliderRendered {...settings}>{children}</SliderRendered>;
  }
}

export default Slider;
