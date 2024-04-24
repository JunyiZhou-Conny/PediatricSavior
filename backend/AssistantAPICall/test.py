from main import *

simulationFile = loadFile("backend/AssistantAPICall/case_1.json")
user_message = input("User: ")
thread, run, simulationFile = initialize(user_message, simulationFile)
while user_message != "STOP":
    wait_on_run(run, thread)
    print(getChatHistory(thread)[-1])
    user_message = input("User: ")
    run = submit_message(thread, user_message, simulationFile)
