var app = angular.module("mainApp", []);

app.controller("demoController", function ($scope, $http) {
    dataProduct();
    function dataProduct() {
        // call API
        return $http.get("https://fakestoreapi.com/products").then(
            function successCallback(response) {
                // add prop count into obj in array
                response.data.forEach(data => {
                    data.count = 0;
                });
                $scope.products = response.data;

            }, function errorCallback(response) {
                console.log("error: ", response);
            }
        )
    }
    // สร้าง array มาเก็บ obj ตอนคลิก เพื่อเอาไปแสดงใน cart
    $scope.arrprods = [];
    $scope.addProduct = function (data) {
        // ถ้ากดเพิ่มสินค้า ต้องนับจำนวนเพิ่มขึ้น 1
        data.count += 1;
        // เช็ค arr ของ cart ว่ามี obj หรือยัง ถ้ายังให้เพิ่มเข้า list แต่ถ้ามีแล้วให้ไป
        // เช็ค obj ใน array ของ cart ว่าใช่ตัวเดียวกันกับที่ส่งเข้ามาใหม่ไหม
        // โดยเช็คจาก id ถ้าตรงกันให้ส่งค่าออกมาเป็น true
        // ถ้าไม่ตรงกันให้ส่งค่าออกมาเป็น false และให้เพิ่มลงไปใน arr ของ cart
        if ($scope.arrprods.length) {
            let checkProd = $scope.arrprods.some((item) => {
                return item.id == data.id;
            });
            console.log(checkProd);
            if (checkProd) {
                console.log("true: ", checkProd);
            } else {
                console.log("false: ", checkProd);
                $scope.arrprods.push(data);
            }
        } else {
            $scope.arrprods.push(data);
        };
        console.log($scope.arrprods);
        sumPrice();
    }

    $scope.sum = 0;
    function sumPrice() {
        $scope.arrprods.forEach(data => {
            $scope.sum += data.price * data.count;
        });
    }

    $scope.checkOut = function (data) {
        console.log("data: ", data);
        items = [{
            "category" : "men's clothing",
            "count": 1,
            "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "id": 1,
            "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            "price": 109.95
        }]
        return $http.post("http://localhost:8080/products", items).then(
            function successCallback(response) {
                console.log("success: ", response);
            }, function errorCallback(response) {
                console.log("error: ", response);
            }
        )
    }
});

// app.directive("product", function () {
//     return {
//         templateUrl: "product/product.html",
//         scope: {
//             data: '='
//         },
//     }
// });
