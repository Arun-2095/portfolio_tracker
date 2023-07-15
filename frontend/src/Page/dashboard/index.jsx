import React from 'react'
import {useSelector} from "react-redux"
import Table from "@/components/table"

export default function Dashboard() {

  const store = useSelector(state => state.dashboard)

  const Header = ['Sl No','Total Income', 'Total Expense', 'saving Percentage' , 'investment Percentage']
  
  console.log(store, "store")
  return (
    <div>Dashboard
      <Table header={Header} />
    </div>
  )
}
