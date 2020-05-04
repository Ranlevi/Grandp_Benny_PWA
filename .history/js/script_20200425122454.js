var about_btn       = document.querySelector('#info_icon');
var about_modal     = document.querySelector('#about_modal');
var close_modal_btn = document.querySelector('#close_modal_btn');

var mySwiper = null;
var storyObj = null;
var language = null;

////////////////////////////
fetch("./json/config.json")
  .then(function(res){
    return (res.json());
  })
  .then(function(data) {
    language = data.language;
    get_story_json(language);  
  })

//////////////////////////////////
function get_story_json(language){

  var json_name = null;
  
  if (language == "en"){
    json_name = "./json/story_en.json";
  } else if (language == "heb"){
    json_name = "./json/story_heb.json";
    
    document.querySelector('#html_tag').lang="heb";
    document.querySelector('#html_tag').dir ="rtl";
    document.querySelector('#swiper_container').dir ="rtl";    
  }

  //Init only after language detected.
  mySwiper = new Swiper('.swiper-container');
  
  fetch(json_name)
  .then(function(res){
    return (res.json());
  })
  .then(function(data) {
    storyObj = data;
    load_pages();        
  })  
}

//////////////////////
function load_pages(){  
  var num_of_pages = storyObj.story.number_of_pages;

  for (var i=0;i<num_of_pages;i++){

    var img_src = storyObj.story.pages[i].image_url;
    var img_alt = storyObj.story.pages[i].image_alt;
    var text    = storyObj.story.pages[i].text;

    var str = '<div class="content_area">';
    str += '<img src="' + img_src + '" alt="' + img_alt + '">';    
    str += '<div class="story_text">' + text + '</div>';
    str += '</div></div>';

    mySwiper.appendSlide('<div class="swiper-slide">' + str + '</div>');
  }

  document.querySelector('#about_title').innerHTML = storyObj.story.about.title;
  document.querySelector('#about_description').innerHTML = storyObj.story.about.description;
  document.querySelector('#about_credits_title').innerHTML = storyObj.story.about.credits_title;

}

////////////////////////////////////////////////
about_btn.addEventListener('click', function(){
  about_modal.classList.add('is-active');
})

//////////////////////////////////////////////////////
close_modal_btn.addEventListener('click', function(){
  about_modal.classList.remove('is-active');
})
