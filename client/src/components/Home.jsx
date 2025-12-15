import React from "react";
import ExpensesCard from "./ExpensesCard";
import BackgroundSection from "./BackgroundSection";
import Map from "./Map";
import Video from "./Video";
import MyForm from "./MyForm";

export default function Home() {
  return (
    <div>
      <ExpensesCard />
      <BackgroundSection />
      <Map />
      <Video />
      <MyForm />
    </div>
  );
}
