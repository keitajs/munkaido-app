app.controller('munkaidoCtrl', function($scope){
  $scope.date = ''
  $scope.start = ''
  $scope.end = ''
  $scope.employeeId = ''
  $scope.activeMunkaido = null
  $scope.alkalmazottak = []
  $scope.munkaidok = []

  $scope.get = async () => {
    try {
      const { data: alkalmazottak } = await axios.get('http://localhost:2000/alkalmazottak')
      $scope.alkalmazottak = alkalmazottak

      const { data: munkaidok } = await axios.get('http://localhost:2000/munkaidok')
      $scope.munkaidok = munkaidok.map(munkaido => {
        munkaido.employee = alkalmazottak.find(x => x.id === munkaido.employeeId)
        munkaido.start = new Date("2000-01-01T" + munkaido.start + "Z")
        munkaido.end = new Date("2000-01-01T" + munkaido.end + "Z")
        return munkaido
      })
      
      if (munkaidok.length > 0) $scope.employeeId = munkaidok[0].id

      $scope.$apply()
    } catch (error) {
      console.log(error)
      alert('Server error!')
    }
  }

  $scope.updateClick = async () => {
    if (!$scope.employeeId || !$scope.date || !$scope.start || !$scope.end) return alert('Adj meg minden adatot!')

    if (!$scope.activeMunkaido) {
      try {
        await axios.post('http://localhost:2000/munkaido', { date: $scope.date, start: $scope.start, end: $scope.end, employeeId: $scope.employeeId })
        $scope.$apply()
        alert('Sikeresen felvetted a munkaidőt!')
        window.location.reload()
      } catch (error) {
        console.log(error)
        alert('Server error!')
      }
    } else {
      try {
        await axios.patch(`http://localhost:2000/munkaido/${$scope.activeMunkaido.id}`, { date: $scope.date, start: $scope.start, end: $scope.end, employeeId: $scope.employeeId })
        $scope.$apply()
        alert('Sikeresen módosítotad a munkaidőt!')
        window.location.reload()
      } catch (error) {
        console.log(error)
        alert('Server error!')
      }
    }
  }

  $scope.removeClick = async () => {
    try {
      await axios.delete(`http://localhost:2000/munkaido/${$scope.activeMunkaido.id}`)
      alert('Sikeresen törölted a munkaidőt!')
      window.location.reload()
    } catch (error) {
      console.log(error)
      alert('Server error!')
    }
  }

  $scope.update = async (item) => {
    if ($scope.activeMunkaido && $scope.activeMunkaido.id === item.id) return $scope.closeUpdate()

    $scope.employeeId = item.employeeId
    $scope.date = new Date(item.date)
    $scope.start = item.start
    $scope.end = item.end
    $scope.activeMunkaido = item
  }

  $scope.closeUpdate = async () => {
    $scope.employeeId = ''
    $scope.date = ''
    $scope.start = ''
    $scope.end = ''
    $scope.activeMunkaido = null
  }

  $scope.get()
})