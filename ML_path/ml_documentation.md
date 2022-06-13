# ML Documentation

1. Collect datasets from various sources. 
   We use sources from Kaggle (https://www.kaggle.com/datasets/narendrageek/mental-health-faq-for-chatbot), Alodokter (https://www.alodokter.com/community/topic-tag/health -mental), Hellosehat (https://hellosehat.com/community/kesehatan-mental/), and SehatQ (https://www.sehatq.com/forum/psikologi?)
2. Selecting data and labeling manually
   We filter the data and label it manually because there are some data that irrelevant in Indonesia because our source is from US dataset. There are data in out dataset.
3. Pre-processing data 
   The next step is preprocessing, we convert the text data into some meaningful data so that we can get valid and hidden useful patterns for further processing steps. The applied preprocessing methods include case folding, stemming, removing stopwords, and removing punctuation so the data which is in the text form, have same format.
4. Create a model with dense and dropout layers with relu activation as input and softmax activation as output
   Create a neural network model with dense and dropout layers, we use drop out layers to reduce overfitting.  For activation function, we use relu activation as input and softmax activation as output. For optimizer we try SGD and Adam, and the better performance is shown using Adam. 
5. Training
   We train the created model with 200 epochs
6. Convert model to tflite
   We convert the model to tflite format for deployment
