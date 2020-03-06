const db = require("../models");
const axios = require("axios");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Book
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Book
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {

    db.Book
    .findOne({link: req.body.link})
    .then(dbModel => {
      console.log(dbModel);
      
      if(!dbModel){
        console.log("new book");
        
        db.Book
          .collection.insert(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      } else {
        console.log("went here");
        
        res.json(dbModel)
      }
    })
    .catch(err => res.status(422).json(err));

  },
  update: function(req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  qGoogle: function(req,res) {
    const APIkey = process.env.API_KEY_GOOGLE_BOOKS;
    let query = req.params.name;
    
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + query + "&Results=20&printType=books&key=" + APIkey)
      .then(data => {
        let responseJSON = []
        if(data.data.items.length > 0){
          for (let index = 0; index < data.data.items.length; index++) {
            let title = data.data.items[index].volumeInfo.title;
            let authors = (data.data.items[index].volumeInfo.authors) ? data.data.items[index].volumeInfo.authors : ["~~Author Not Found~~"];
            let description = (data.data.items[index].volumeInfo.description) ? data.data.items[index].volumeInfo.description : "No Description Available";
            let image = (data.data.items[index].volumeInfo.imageLinks) ? data.data.items[index].volumeInfo.imageLinks.thumbnail : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHEhUTBxMWFhUVFx8ZGBgXGBsgGxsaFxUWHhoZFx0eICggIRomGxgXIzEiKikrLi4uFyAzODMtNygtLisBCgoKDg0NGBAQGCsfHSUsKy0wMjcwLTc3Mjc1LS0tLTEuLzctLy8tKystLS0rLystKysrLS0tKzUrLS0tLS0rN//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABgcEBQECAwj/xABOEAABAwIDBAYFBgoHBwUAAAABAAIDBBEFBiESMUFRBxMiMmGBUnGRobEUFSMzQnIkJTRDU2KSwdHwVGOCg6Ky4RYmk6PC0tMINUVzlP/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAnEQEBAAECBAUFAQAAAAAAAAAAAQIRMRITIbEyQVGh4SIj0fDxA//aAAwDAQACEQMRAD8AvFERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERARajMeZsHyzH1mMzNYODb3c7wa3eVBvlecekPSgDsOojoZHX+USD9QabII438ygkOas/4bgj/k9A11TVu0ZBFqb8NsjRov5+CjdbgvSBUsGITz7NVEduOijP0Wx9qN+vaeRxudVNMq5PwbKrLYZH2z35XayPPEudv38Ny36DS5SzLQ5ppxPQG32XsPejeN7HjmPet0oBmjLOJYPOcSyX9b+fptzKgcTbcJOR/wBb7/KGbsNzVGXUZ2ZWaSwv0kjduIcN9rgi/ggkCIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiKGZl6Q8OwuT5NhDXVdWd0MOtj/WO3NG7x1QS+pqIaVpfUuDWtFy5xsAPElV1X5+xLMj3U/R1F1hB2X1UgtDGebb94+XkUpskY1mxzZukOXsg7TaOE2iby6wgnaPqPmrCoqOmoGNjomNYxos1rQAAPABBDsudHNFRSfKcxPNZVnfJLq1p/q2bgP50U4REBERAULzhkf5ykFZl2T5NXMHZkHdk/UmFiCDzsfNTREEFyrnx803yHNkXyatA0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FfakJP5LR8S0m21Je7rnhopllMZrSS5XSN9mfNBqY3x0UhZA27J52alzjoYKX0nnc5+7yW46Puj81HV1WYYhGyPWmpNNlgvpJL6Uh3689eQzMh5FdI6OrzHG1uwB8mpbdmBu8OcDvl3Em1wRz3WWs4423iy/nytsnSCIi6MCIiAiIgIiICIiAiIgIiICIiAiIg1WJ5cwbFfy+BjjztZ37QsVH6no+jjH4mqp4f1XESM9RD76eamqLOWOOW81WZWbVUOMdHeIyG9ZSUtSPThLoZfYLC/mo/JTVuCn6GpraE8G1LBLF6trUK/lw5odo4XCxyZPDbP30b5lu8lU/hWa840guYqatZ6VNJsvtzLTpfyWxHSbgkh2MdimpX7vp4iG38Hxm9vGymeI5PwDETeaBod6TOw72tstPVZGqI2kYbVvI9Coa2VnwB96n3Z6X2/J9u+s90cxOnwzHW7WHuMo5wmOcD+y4tlHkbqtMx4bTMfE2BzXP60DYDpGSAa32o5m7TBcd7acBvU9xfo8nB2qvD2PI16yik6t9+ew4jX2rRVuF0XWQsxueulEZPV01RE4vc42Gw14bYgm1xe1k51m+N7ry5dsowcOw2OdnWVZIgPYvHfanN9KelG8RX3v0LyLnRWvk3JronNqsfY0StFoIG6x07eAHOS28rNyplh1O4VOMAdds2ZGO5A3g1g9K293sUtTDC28We/ZMspJw47dxERdnMREQEREBERAREQEREBERAREQEREBERAREQEREBERAXBa07wNNy5RAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREH//Z";
            let link = data.data.items[index].volumeInfo.infoLink;
  
  
            let currentBook = {
              title: title,
              authors: authors,
              description: description,
              image: image,
              link: link
            }
  
            responseJSON.push(currentBook);
            
            if((index+1) === data.data.items.length){
              
              res.json(responseJSON);
            }
          }
        } else {
          responseJSON.push({error: "error"});
          res.json(responseJSON);
        }
      })
      .catch(err => res.status(422).json(err));
  }
};
