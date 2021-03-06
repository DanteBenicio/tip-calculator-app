const inputBill = document.getElementById('input_bill');
const inputNumberOfPeople = document.getElementById('input_number_of_people')
const errorMessageFirstInput = document.querySelector('.first_input')
const errorMessageSecondInput = document.querySelector('.second_input')

const collectionTips = Array.from(document.querySelector('.flex_tip_wrapper').children).filter(tip => !tip.className.includes('custom'))
const tipsWrapper = document.querySelector('.flex_tip_wrapper')
const customTip = document.querySelector('.tip.custom')
const errorMessageTipWrapper = document.querySelector('.tip_wrapper')

const tipAmountValue = document.getElementById('tip_amount')
const totalValue = document.getElementById('total')

const calcButton = document.querySelector('.button.calc')
const resetButton = document.querySelector('.button.reset')
const body = document.querySelector('body')

calcButton.addEventListener('click', calcTotal)
resetButton.addEventListener('click', cleanCalculatedValues)
customTip.addEventListener('input', removeActiveTip)
body.addEventListener('click', hiddenErrorMessage)

collectionTips.forEach(tip => {
  tip.addEventListener('click', e => {
    for (tip of collectionTips) {
      if (tip !== e.currentTarget && tip.className.includes('active')) {
        tip.classList.remove('active')
      }

      if (e.currentTarget === tip) {
        tip.classList.add('active')
      }
    }
  })
})

function hiddenErrorMessage(e) {
  if (e.target !== calcButton && e.target !== resetButton) {
    if (errorMessageFirstInput.textContent && errorMessageSecondInput.textContent && errorMessageTipWrapper.textContent) {
      errorMessageFirstInput.textContent = ''
      errorMessageSecondInput.textContent = ''
      errorMessageTipWrapper.textContent = ''
  
      inputBill.style.borderColor = 'transparent'
      inputNumberOfPeople.style.borderColor = 'transparent'
  
      return
    }

    if (errorMessageTipWrapper.textContent) {
      errorMessageTipWrapper.textContent = ''
    }

    if (errorMessageFirstInput.textContent && errorMessageSecondInput.textContent) {
      errorMessageFirstInput.textContent = ''
      errorMessageSecondInput.textContent = ''
  
      inputBill.style.borderColor = 'transparent'
      inputNumberOfPeople.style.borderColor = 'transparent'
  
      return
    }
  
    if (errorMessageFirstInput.textContent) {
      errorMessageFirstInput.textContent = ''
      inputBill.style.borderColor = 'transparent'
  
      return
    }
  
    if (errorMessageSecondInput.textContent) {
      errorMessageSecondInput.textContent = ''
      inputNumberOfPeople.style.borderColor = 'transparent'
  
      return
    }
  }
}

function removeActiveTip() {
  collectionTips.forEach(tip => tip.classList.remove('active'))
}

function getTipPercentage() {
  if (!customTip.value) {
    const selectedTip = collectionTips.find(tip => tip.className.includes('active'));
    if (!selectedTip) {
      return
    }
    const percentage = Number(selectedTip.getAttribute('data-value'))
  
    return percentage
  }
  
  collectionTips.forEach(tip => tip.classList.remove('active'))
  return customTip.value
}

function calcTipAmountForPerson(totalValuePorPerson, tipValue) {
  const value = ((tipValue / 100) * totalValuePorPerson).toFixed(2)

  return value
}

function calcTotal() {
  const inputBillValue = Number(inputBill.value);
  const inputNumberOfPeopleValue = Number(inputNumberOfPeople.value)

  if (!inputBillValue && !inputNumberOfPeopleValue) {
    errorMessageFirstInput.textContent = "Can't be a zero."
    errorMessageSecondInput.textContent = "Can't be a zero."

    inputBill.style.borderColor = 'hsla(0, 93%, 49%, 0.651)'
    inputNumberOfPeople.style.borderColor = 'hsla(0, 93%, 49%, 0.651)'

    return
  }

  if (!inputBillValue) {
    errorMessageFirstInput.textContent = "Can't be a zero."
    inputBill.style.borderColor = 'hsla(0, 93%, 49%, 0.651)'

    errorMessageSecondInput.textContent = ""
    inputNumberOfPeople.style.borderColor = 'transparent'

    return
  }

  if (!inputNumberOfPeopleValue) {
    errorMessageSecondInput.textContent = "Can't be a zero."
    inputNumberOfPeople.style.borderColor = 'hsla(0, 93%, 49%, 0.651)'

    errorMessageFirstInput.textContent = ""
    inputBill.style.borderColor = 'transparent'

    return
  }

  errorMessageFirstInput.textContent = ""
  errorMessageSecondInput.textContent = ""

  inputBill.style.borderColor = 'transparent'
  inputNumberOfPeople.style.borderColor = 'transparent'

  const tipPercentage = getTipPercentage()

  if (!tipPercentage) {
    errorMessageTipWrapper.textContent = "Select a tip."

    return
  }

  const valuePerPersonNoTip = inputBillValue / inputNumberOfPeopleValue

  const tipPerPerson = calcTipAmountForPerson(valuePerPersonNoTip, tipPercentage)

  const totalValuePerPerson = valuePerPersonNoTip + Number(tipPerPerson)

  showValue(tipPerPerson, totalValuePerPerson)
}

function showValue(tipPerPerson, totalValueForPerson) {
  tipAmountValue.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(tipPerPerson)
  totalValue.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(totalValueForPerson)

  resetButton.style.display = 'block'
}

function cleanCalculatedValues() {
  inputBill.value = ''
  inputNumberOfPeople.value = ''

  tipAmountValue.textContent = '$0.00'
  totalValue.textContent = '$0.00'

  customTip.value = ''

  errorMessageFirstInput.textContent = ""
  errorMessageSecondInput.textContent = ""
  errorMessageTipWrapper.textContent = ""

  inputBill.style.borderColor = 'transparent'
  inputNumberOfPeople.style.borderColor = 'transparent'

  collectionTips.forEach(tip => tip.classList.remove('active'))
}