app.controller('alkalmazottakCtrl', function($scope){
  $scope.name = ''
  $scope.address = ''
  $scope.position = ''
  $scope.pricePerHour = ''
  $scope.activeAlkalmazott = null
  $scope.alkalmazottak = []

  $scope.get = async () => {
    try {
      const { data } = await axios.get('http://localhost:2000/alkalmazottak')
      $scope.alkalmazottak = data
      $scope.$apply()
    } catch (error) {
      console.log(error)
      alert('Server error!')
    }
  }

  $scope.updateClick = async () => {
    if (!$scope.name || !$scope.address || !$scope.position || !$scope.pricePerHour) return alert('Adj meg minden adatot!')
    if (isNaN($scope.pricePerHour)) return alert('Az órabér csak szám lehet!')

    if (!$scope.activeAlkalmazott) {
      try {
        await axios.post('http://localhost:2000/alkalmazott', { name: $scope.name, address: $scope.address, position: $scope.position, pricePerHour: $scope.pricePerHour })
        $scope.$apply()
        alert('Sikeresen felvetted az alkalmazottat!')
        window.location.reload()
      } catch (error) {
        console.log(error)
        alert('Server error!')
      }
    } else {
      try {
        await axios.patch(`http://localhost:2000/alkalmazott/${$scope.activeAlkalmazott.id}`, { name: $scope.name, address: $scope.address, position: $scope.position, pricePerHour: $scope.pricePerHour })
        $scope.$apply()
        alert('Sikeresen módosítotad az alkalmazottat!')
        window.location.reload()
      } catch (error) {
        console.log(error)
        alert('Server error!')
      }
    }
  }

  $scope.removeClick = async () => {
    try {
      await axios.delete(`http://localhost:2000/alkalmazott/${$scope.activeAlkalmazott.id}`)
      alert('Sikeresen törölted az alkalmazottat!')
      window.location.reload()
    } catch (error) {
      console.log(error)
      alert('Server error!')
    }
  }

  $scope.update = async (item) => {
    if ($scope.activeAlkalmazott && $scope.activeAlkalmazott.id === item.id) return $scope.closeUpdate()

    $scope.name = item.name
    $scope.address = item.address
    $scope.position = item.position
    $scope.pricePerHour = item.pricePerHour
    $scope.activeAlkalmazott = item
  }

  $scope.closeUpdate = async () => {
    $scope.name = ''
    $scope.address = ''
    $scope.position = ''
    $scope.pricePerHour = ''
    $scope.activeAlkalmazott = null
  }

  $scope.get()
});