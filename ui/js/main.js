var isVisible = true;

  function navCollapse() {
  
  const sideNav = document.getElementById('left-nav');
  const mainContainer = document.getElementById('dash-main');

  sideNav.style.width = !isVisible ? '255px' : '0';
  
  mainContainer.style.marginLeft = !isVisible ? '255px' : '0';
  mainContainer.style.transition = 'margin-left .2s';

  isVisible = !isVisible;
};

//show and hide account division 
var flag = 0;
    function myAccount() {
      if (flag == 1){
        document.getElementById("account").style = "display:none; transition:.6s;";
      flag= 0;
      }
      else{
        document.getElementById("account").style = "display:block; background:none;";
      flag= 1;
      }
    }

