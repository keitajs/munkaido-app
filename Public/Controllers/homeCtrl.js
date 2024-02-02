app.controller('homeCtrl', function($scope) {
  $scope.alkalmazottak = []
  $scope.munkaidok = []
  $scope.fizeteselolegek = []
  $scope.stats = []
  $scope.months = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December']

  $scope.month = new Date().getMonth()
  $scope.monthName = $scope.months[$scope.month]

  $scope.get = async () => {
    try {
      const { data: alkalmazottak } = await axios.get('http://localhost:2000/alkalmazottak')
      $scope.alkalmazottak = alkalmazottak

      const { data: fizeteselolegek } = await axios.get('http://localhost:2000/fizeteselolegek')
      $scope.fizeteselolegek = fizeteselolegek

      const { data: munkaidok } = await axios.get('http://localhost:2000/munkaidok')
      $scope.munkaidok = munkaidok

      $scope.stats = alkalmazottak.map(alkalmazott => {
        const name = alkalmazott.name
        const pricePerHour = alkalmazott.pricePerHour
        const idok = munkaidok.filter(x => x.employeeId === alkalmazott.id && new Date(x.date).getMonth() === $scope.month)
        const milliseconds = idok.reduce((a, c) => {
          return a + Number(new Date("2000-01-01T" + c.end + "Z") - new Date("2000-01-01T" + c.start + "Z"))
        }, 0)
        const hours = (milliseconds / 1000 / 60 / 60).toFixed(2)
        const prepayments = fizeteselolegek.filter(x => x.employeeId === alkalmazott.id && $scope.month === x.month)
        const prepayment = prepayments.reduce((a, c) => { return a + c.value }, 0)
        const salary = hours * pricePerHour

        return { name, pricePerHour, hours, prepayment, salary }
      })

      $scope.$apply()
    } catch (error) {
      console.log(error)
      alert('Server error!')
    }
  }

  $scope.prevMonth = () => {
    $scope.month = $scope.month - 1 >= 0 ? $scope.month - 1 : 11
    $scope.monthName = $scope.months[$scope.month]
    $scope.get()
  }

  $scope.nextMonth = () => {
    $scope.month = $scope.month + 1 < 12 ? $scope.month + 1 : 0
    $scope.monthName = $scope.months[$scope.month]
    $scope.get()
  }

  $scope.get()
})