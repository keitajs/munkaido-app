app.controller('fizeteselolegCtrl', function($scope) {
  $scope.employeeId = ''
  $scope.month = ''
  $scope.value = ''
  $scope.activeFizeteseloleg = null
  $scope.fizeteselolegek = []
  $scope.alkalmazottak = []
  $scope.months = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December']

  $scope.get = async () => {
    try {
      const { data: alkalmazottak } = await axios.get('http://localhost:2000/alkalmazottak')
      $scope.alkalmazottak = alkalmazottak

      const { data: fizeteselolegek } = await axios.get('http://localhost:2000/fizeteselolegek')
      $scope.fizeteselolegek = fizeteselolegek.map(eloleg => {
        eloleg.employee = alkalmazottak.find(x => x.id === eloleg.employeeId)
        eloleg.monthName = $scope.months[eloleg.month]
        return eloleg
      })

      $scope.$apply()
    } catch (error) {
      console.log(error)
      alert('Server error!')
    }
  }

  $scope.updateClick = async () => {
    if (!$scope.employeeId || !$scope.month || !$scope.value) return alert('Adj meg minden adatot!')
    if (isNaN($scope.value)) return alert('A fizetés előleg csak szám lehet!')

    if (!$scope.activeFizeteseloleg) {
      try {
        await axios.post('http://localhost:2000/fizeteseloleg', { employeeId: $scope.employeeId, month: $scope.month, value: $scope.value })
        $scope.$apply()
        alert('Sikeresen felvetted az fizetés előleget!')
        window.location.reload()
      } catch (error) {
        console.log(error)
        alert('Server error!')
      }
    } else {
      try {
        await axios.patch(`http://localhost:2000/fizeteseloleg/${$scope.activeFizeteseloleg.id}`, { employeeId: $scope.employeeId, month: $scope.month, value: $scope.value })
        $scope.$apply()
        alert('Sikeresen módosítotad az fizetés előleget!')
        window.location.reload()
      } catch (error) {
        console.log(error)
        alert('Server error!')
      }
    }
  }

  $scope.removeClick = async () => {
    try {
      await axios.delete(`http://localhost:2000/fizeteseloleg/${$scope.activeFizeteseloleg.id}`)
      alert('Sikeresen törölted az fizetés előleget!')
      window.location.reload()
    } catch (error) {
      console.log(error)
      alert('Server error!')
    }
  }

  $scope.update = async (item) => {
    if ($scope.activeFizeteseloleg && $scope.activeFizeteseloleg.id === item.id) return $scope.closeUpdate()

    $scope.employeeId = item.employeeId
    $scope.month = item.month
    $scope.value = item.value
    $scope.activeFizeteseloleg = item
  }

  $scope.closeUpdate = async () => {
    $scope.employeeId = ''
    $scope.month = ''
    $scope.value = ''
    $scope.activeFizeteseloleg = null
  }

  $scope.get()
})