interface Chat {
  name: string;
  model: string;
}

const foodChat: Chat = {
  name: 'food recipes exploration',
  model: 'gpt-4'
};

const typescriptChat: Chat = {
  name: 'typescript teacher',
  model: 'gpt-3.5-turbo'
};

function displayChat(chat: Chat) {
  console.log(`Chat: ${chat.name}, Model: ${chat.model}`);
}

function narrowToNumber(value: unknown): number {
  if (typeof value !== 'number') {
      throw new Error('Value is not a number');
  }

  return value;
}

async function getChatMessageWithNarrowing(chatId: unknown, req: { authorization: string }) {
  const authToken = req.authorization;
  const numberChatId = narrowToNumber(chatId);
  const messages = await chatService.getChatMessage(numberChatId, authToken);

  if (messages === null) {
      return { success: false, message: 'Chat not found or access denied' };
  }

  for (const message of messages) {
      console.log(`Message ID: ${message.id}, Feedback: ${message.feedback.trim() ?? 'no feedback'}`)
  }

  return { messages, success: true }
}

type MapCallback = (message: IMessage) => void;

const logMessage: MapCallback = (message) => {
  console.log(`Message ID: ${message.id}`);
}

messages.map(logMessage);

interface IUser {
  id: number;
  name: string;
  email: string;
}

type UserPreview = Pick<IUser, 'id' | 'name'>;

const userPreview: UserPreview = { id: 1, name: 'John' };

type UserNamesById = Record<IUser, string>

const userNameById: UserNamesById = { '1': 'John', '2': 'Alice' };

type PartialUser = Partial<IUser>;
const partialUser: PartialUser = { id: 1 };

type RequiredUser = Required<PartialUser>;
const requiredUser: RequiredUser = { id: 1, name: 'John', email: 'john@example.com' };

type UserWithoutEmail = Omit<IUser, 'email'>;
const userWithoutEmail: UserWithoutEmail = { id: 2, name: 'Alice' };

type ReadonlyIUser = Readonly<IUser>;
const user: ReadonlyIUser = { id: 1, name: 'John', email: 'john@example.com' };

type MessageType = 'user' | 'system';

interface IMessage {
  type: MessageType;
}

type DbChatSuccessResponse = {
  success: true;
  data: IChat;
}

type DbChatErrorResponse = {
  success: false;
  error: string;
}

function getChatFromDb(chatId: string): DbChatSuccessResponse | DbChatErrorResponse {
  const findChatById = (_: string) => ({} as IChat);
  const chat = findChatById(chatId);

  if (!chat) {
      return {
          success: false,
          error: 'Chat not found in the database';
      }
  }

  return {
      success: true,
      data: chat,
  }
}

const dbResponse = getChatFromDb('chat123');

if (dbResponse.success) {
  console.log('Chat data:', dbResponse.data);
} else {
  console.log('Error:', dbResponse.error);
}

type IDBEntityWithId = {
  id: number;
};
type IChatEntity = {
  name: string;
}
type IChatEntityWithId = IDBEntityWithId & IChatEntity;
const chatEntity: IChatEntityWithId = {
  id: 1,
  name: 'TypeScript tuitor',
};

interface IMessageWithType extends IMessage {
  type: MessageType;
}

const userMessage: IMessageWithType = {
  id: 10,
  chatId: 2,
  userId: 1,
}

function printValue<T>(value: T): void {
  console.log(value);
}

abstract class AbstractDatabaseResource {
  constructor (protected resourceName: string) {}

  protected logResource(resource: { id: number }): void {
      console.log(`[${this.resourceName}] Resource logged:`, resource);
  }

  abstract get(id: number): { id: number } | null
  abstract getAll(): { id: number }[]
  abstract addResource(resource: { id: number }): void
}

class GenericsInMemoryResource<T extends { id: number }> extends AbstractDatabaseResource {
  private resources: T[] = [];

  constructor(resourceName: string) {
      super(resourceName);
  }

  get(id: number): T | null {
      const resource = this.resources.find((item) => item.id === id);
      return resource ? { ...resource } : null;
  }

  getAll(): T[] {
      return [...this.resources];
  }

  addResource(resource: T): void {
      this.resources.push(resource);
      this.logResource(resource);
  }
}

const userInMemoryResource = new GenericsInMemoryResource<IUser>('user');
const chatInMemoryResource = new GenericsInMemoryResource<IChat>('chat');

userInMemoryResource.addResource({ id: 1, name: 'Admin', email: 'admin@admin.com' });
chatInMemoryResource.addResource({ id: 10, ownerId: userInMemoryResource.get(1)!.id, messages: [] });

function fetchData(): Promise<string> {
  return new Promise((resolve) => {
      setTimeout(() => resolve('Data Fetched'), 1000);
  });
}