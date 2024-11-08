# Import necessary libraries
from simpletransformers.classification import ClassificationModel, ClassificationArgs
from datasets import load_dataset
import pandas as pd
import logging
import os

# Set visible cuda device and logging configurations
os.environ["CUDA_VISIBLE_DEVICES"] = "2"
logging.basicConfig(level=logging.INFO)
transformers_logger = logging.getLogger("transformers")
transformers_logger.setLevel(logging.WARNING)

# Helper function to map sentiment string to label
def map_sentiment_to_label(sentiment_str):
    """A function helps to maps the sentiment label to the 0,1,2"""
    # Check if the sentiment_str contains "bearish", "bullish", or "neutral"
    if sentiment_str is None:
        return 2
    elif "bearish" in sentiment_str.lower():
        return 0
    elif "bullish" in sentiment_str.lower():
        return 1
    elif "neutral" in sentiment_str.lower():
        return 2
    else:
        return 2

# Load the dataset and split into training and testing part
ds = load_dataset("StephanAkkerman/financial-tweets-stocks")
ds = ds['train'].train_test_split(test_size=0.3, shuffle=False)

# Map the different sentiment string into the label; 0: bearish, 1: bullish and 2: Neutral
ds = ds.map(lambda x: {'sentiment': map_sentiment_to_label(x['sentiment'])})

# Select the required columns to finetune the model
train_ds = ds['train'].select_columns(["description", "sentiment"])
test_ds = ds['test'].select_columns(["description", "sentiment"])

# Use the train split of the dataset and convert it to the desirable format for training
train_df = ds['train'].to_pandas()
train_df = train_df.rename(columns={"description": "text", "sentiment": "labels"})

# Set the finetuning parameters
model_args = ClassificationArgs()
model_args.num_train_epochs = 5
model_args.learning_rate = 2e-5
model_args.output_dir = "test_base_finetuned_model_11_07"
model_args.use_multiprocessing = False
model_args.use_multiprocessing_for_evaluation = False
model_args.labels_list = [0, 1, 2]

# Additional hyperparameters for potential improvement
model_args.gradient_accumulation_steps = 2  # Accumulate gradients to simulate larger batch size
model_args.warmup_steps = 100  # Gradual learning rate increase at the start of training
model_args.save_steps = 500  # Save model every 500 steps
model_args.best_model_dir = "best_model"  # Directory to save the best model based on evaluation
model_args.use_early_stopping = True  # Use early stopping
model_args.early_stopping_metric = "eval_loss"  # Metric to monitor for early stopping
model_args.early_stopping_patience = 3  # Stop after 3 evaluation steps without improvement

# Create a ClassificationModel for the model we want to train
# Create a ClassificationModel for the model we want to train
model = ClassificationModel(
    'longformer',
    'test_base_model_11_07',
    num_labels=3,
    args=model_args,
)

# Train the model; this will train the model and store the finetuned model in the directory specified in `model_args.output_dir` argument.
model.train_model(train_df)

# Run some basic prediction using the finetuned model
predictions, raw_outputs = model.predict(["$BTC is all time low.".lower()])
print("$BTC is all time low.",predictions)
print("$BTC is all time low.",raw_outputs)

predictions, raw_outputs = model.predict(["$BTC is all time high.".lower()])
print("$BTC is all time high.",predictions)
print("$BTC is all time high.",raw_outputs)