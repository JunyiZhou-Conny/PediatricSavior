from openai import OpenAI
from dotenv import load_dotenv
import json
#add/modify new functions of openAI


class BMVAssistant:
    def __init__(self, json_file, instruction_text=None):
        load_dotenv()
        self.client = OpenAI()

        # load instruction text
        if instruction_text is not None:
            self.instruction = instruction_text
        else:
            with open("backend/CompletionsAPI/instruction_text.txt", "r") as file:
                self.instruction = file.read()

        # load data file
        if isinstance(json_file, str):
            with open(json_file, 'r') as file:
                self.data = json.load(file)
        else:
            self.data = json_file

        # initialization
        self.instruction_and_data = f"Instructions: \n {self.instruction} \n Case Description: \n{self.data}"
        self.chat_history = [{"role": "system", "content": self.instruction_and_data}]
        self.chat_history_without_system_message = []

    def submit_message(self, user_message):
        message = {"role": "user", "content": user_message}
        self.chat_history.append(message)
        #self.chat_history.append({"role": "system", "content": self.instruction_and_data})
        self.chat_history_without_system_message.append(message)

    def generate_response(self, streaming):
        return self.client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=self.chat_history,
            stream=streaming
        )

    def get_response(self, print_output=False):
        response = self.generate_response(streaming=False)
        output = response.choices[0].message.content
        if print_output:
            print(output)
        self.chat_history.append({"role": "assistant", "content": output})
        self.chat_history_without_system_message.append({"role": "assistant", "content": output})
        return response.choices[0].message.content


def initialize(case_description, instruction_text):
    assistant = initialize(case_description,instruction_text)
    return assistant


def reset(case_description):
    with open("./backend/CompletionsAPI/instruction_text.txt", "r",encoding='utf-8',errors = 'replace') as file:
        instruction = file.read()
    assistant = BMVAssistant(case_description,instruction)
    return assistant
    
