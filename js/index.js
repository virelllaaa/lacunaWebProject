if(document.readyState == 'loading'){
    document.addEventListener('DOMcontentloaded',ready)
}else{
    ready()
}

function ready(){
    var removeButton = document.getElementsByClassName('aa-remove-product')
    for (var i = 0; i<removeButton.length;i++){
        var button = removeButton[i]
        button.addEventListener('click',removeItem)
    }
    var addToCartBtn = document.getElementsByClassName('aa-add-card-btn')
    for (var i = 0; i<addToCartBtn.length; i++){
        var cartBtn = addToCartBtn[i]
        cartBtn.addEventListener('click',clickedAddToCartBtn)
    }
   
}
var count = 1

function updateTotal(){
    
    var cartContainer = document.getElementsByClassName('itemList')[0]
    var total=0
    if(!cartContainer.getElementsByClassName('cart-row')){
        total=0
    }else{
        var cartRows = cartContainer.getElementsByClassName('cart-row')
    
        for(var i = 0; i < cartRows.length; i++){
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('price')[0]
            var quantityElement = cartRow.getElementsByClassName('quantity')[0]
            var price = parseFloat(priceElement.innerText.replace('$',''))
            var quantity = parseFloat(quantityElement.innerText.replace('x ',''))
            total+= price * quantity
            
        }
    }
    
    document.getElementsByClassName('aa-cartbox-total-price')[0].innerText = document.write = "$ "+total.toString()
}

function removeItem(e){
    var clickedButton = e.target
    console.log('ok')
    if(!clickedButton.parentElement.parentElement){
        return
    }
    clickedButton.parentElement.parentElement.remove()
    updateTotal()
}


function clickedAddToCartBtn(e){
    var clickedCartBtn = e.target
    
    var cartContainer = document.getElementsByClassName('itemList')[0]
    var cartItemNames = cartContainer.getElementsByClassName('cartItemNames')
    var itemQuantity = cartContainer.getElementsByClassName('quantity')
    
    var productRows = clickedCartBtn.parentElement.parentElement
    var ProductTitle = productRows.getElementsByClassName('aa-product-title')[0].innerText
    var ProductPrice = productRows.getElementsByClassName('aa-product-price')[0].innerText
    var ProductImage = productRows.getElementsByClassName('Img')[0].src
    for(var i = 0; i < cartItemNames.length; i++){
        
        if(cartItemNames[i].innerText == ProductTitle){
            count+=1
            itemQuantity[i].innerText = "x "+count
            return
        }else if(cartItemNames[i].innerText != ProductTitle){
            count=1
            continue
        }
        
    }
    
    addItemToCart(ProductTitle,ProductPrice,ProductImage,count)
    updateTotal()
    
}

function addItemToCart(ProductTitle,ProductPrice,ProductImage,count){
    var cartContainer = document.getElementsByClassName('itemList')[0]
    var newCartRow = document.createElement('li')
    newCartRow.classList.add('cart-row')
    if(count==1){
       
        cartContainer.appendChild(newCartRow)
    }

    var newCartRowContent = `
        <a class="aa-cartbox-img" href="#"><img src="${ProductImage}" alt="img"></a>
        <div class="aa-cartbox-info">
            <h4><a href="#" class="cartItemNames">${ProductTitle}</a></h4>
            <p class="price">${ProductPrice}</p>
            <p class="quantity">x ${count}</p>
        </div>
        <a class="aa-remove-product" href="#"><span class="fa fa-times"></span></a>
        `
    newCartRow.innerHTML = newCartRowContent
    newCartRow.getElementsByClassName('aa-remove-product')[0].addEventListener('click',removeItem)
}

function checkoutItem(){
    var cartContainer = document.getElementsByClassName('itemList')[0]
    var cartItemNames = cartContainer.getElementsByClassName('cartItemNames').innerText
    var itemQuantity = cartContainer.getElementsByClassName('quantity').innerText
    var itemPrice = cartContainer.getElementsByClassName('price').innerText
    console.log(cartItemNames,itemQuantity,itemPrice)

}
