const sketch = require('sketch')
const { DataSupplier } = sketch
const util = require('util')
const { getRndInteger, getRndItemFromArray, getRndNumByDigits } = require("./utilities");

import twBankList from './tw-bank-list.json'

export const onStartup = () => {
  let rds = DataSupplier.registerDataSupplier
  let txt = 'public.text'

  rds(txt, 'Bank_Full', 'SupplyBankFull')
  rds(txt, 'Bank_Abbr', 'SupplyBankAbbr')
  rds(txt, 'Bank_Code + Abbr', 'SupplyBankCodeAbbr')
  rds(txt, 'Account_Abbr + 16', 'SupplyAccountAbbr16')
  rds(txt, 'Amount', 'SupplyAmount')
}

export const onShutdown = () => {
  DataSupplier.deregisterDataSuppliers()
}

export const onSupplyBankFull = context => {
  let suppliedData = twBankList.banks.map(bank => bank.fullName)
  supplyRandomData(suppliedData)
}

export const onSupplyBankAbbr = context => {
  let suppliedData = twBankList.banks.map(bank => bank.abbrName)
  supplyRandomData(suppliedData)
}

export const onSupplyBankCodeAbbr = context => {
  let suppliedData = twBankList.banks.map(bank => bank.code + " " + bank.abbrName)
  supplyRandomData(suppliedData)
}

export const onSupplyAccountAbbr16 = context => {
  let suppliedData = twBankList.banks.map(bank => bank.abbrName + " " + getRndNumByDigits(16))
  supplyRandomData(suppliedData)
}

export const onSupplyAmount = context => {
  let dataGen = () => "$" + getRndInteger(0, 99999)
  SupplyRandomDataByRule(dataGen)
}

const supplyRandomData = data => {
  DataSupplier.supplyData(
    context.data.key,
    data.sort(() => Math.random() - 0.5)
      .slice(0, context.data.items.count())
  )
}

const SupplyRandomDataByRule = dataGen => {
  let suppliedData = Array.from(Array(context.data.items.count()), dataGen)
  supplyRandomData(suppliedData)
}