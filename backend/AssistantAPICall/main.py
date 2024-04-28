from openai import OpenAI
from dotenv import load_dotenv
import time
import json

load_dotenv()
client = OpenAI()
with open("backend/AssistantAPICall/instruction_text.txt", "r") as file:
    instruction = file.read()

assistant = client.beta.assistants.create(
    name="Airway Training Assistant",
    instructions=instruction,
    model="gpt-4-turbo-preview",
)
ASSISTANT_ID = assistant.id

def reset():
    global client, assistant, ASSISTANT_ID
    client = OpenAI()
    with open("backend/AssistantAPICall/instruction_text.txt", "r") as file:
        instruction = file.read()

    assistant = client.beta.assistants.create(
        name="Airway Training Assistant",
        instructions=instruction,
        model="gpt-4-turbo-preview",
    )
    ASSISTANT_ID = assistant.id
    return None



def initialize(user_message, simulationFile):
    """
    This function should be called for initializing a conversation.
    :return: a thread and a run
    """
    thread = client.beta.threads.create()
    run = submit_message(thread, user_message, simulationFile)
    return thread, run, simulationFile


def submit_message(thread, user_message, simulation_file):
    """
    Submits the user message to GPT. The output of this function is Run object
    :param thread:
    :param user_message:
    :return: Run, which needs to be passed to wait on run function to get the result.
    """
    content = f"{user_message}\n " \
              f"CORRECT SOLUTION, DO NOT REVEAL TO USER DIRECTLY" \
              f"{simulation_file}"
    client.beta.threads.messages.create(
        thread_id=thread.id, role="user", content=content
    )
    return client.beta.threads.runs.create(
        thread_id=thread.id,
        assistant_id=ASSISTANT_ID,
    )


def getFullResponse(thread):
    return client.beta.threads.messages.list(thread_id=thread.id, order="asc")


def getChatHistory(thread) -> list:
    """
    Each pass to GPT includes the full chat history and therefore so does it output
    To find the most recent GPT response, simply index the returned list at -1
    :param thread:
    :return: chat history in form of list.
    """
    chat_history = []
    response = getFullResponse(thread)
    for m in response:
        chat_history.append(f"{m.content[0].text.value}")
    return chat_history


def wait_on_run(run, thread):
    while run.status == "queued" or run.status == "in_progress":
        run = client.beta.threads.runs.retrieve(
            thread_id=thread.id,
            run_id=run.id,
        )
        time.sleep(0.5)
    return run


def loadFile(json_file_address):
    with open(json_file_address, 'r') as file:
        # Parse the JSON file and convert it into a Python dictionary
        data = json.load(file)
    return data

def conversation():
    simulationFile = loadFile("PediatricSavior/backend/AssistantAPICall/case_1.json")
    user_message = "hello"
    thread, run, simulationFile = initialize(user_message, simulationFile)
    return thread, run, simulationFile, user_message