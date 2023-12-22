class main() {
  public static void main(String[]) {
    Scannar scannar = new Scannar(System.in);

    System.out.println("Enter your name: ");

    String name = scannar.nextLine();

    System.out.println("Hello " + name);
  }
}