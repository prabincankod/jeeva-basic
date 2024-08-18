import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { supabase } from "./lib/utils";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "./components/ui/form";
import { FormInput, Loader } from "lucide-react";
import { useState } from "react";
import { v4 } from "uuid";

function App() {
  const form = useForm();

  const [loading, setLoading] = useState(false);
  const onSubmit = async (values) => {
    setLoading(true);

    console.log('ONSUBMIT',values);


    // random id for  image
    const { data: image } = await supabase.storage
      .from("pp")
      .upload(v4() + ".png", values.profile[0]);
    const { data, error } = await supabase
      .from("donators")
      .insert({ ...values, profile: image?.fullPath })
      .select("*");

    if (image && data) {
      setLoading(false);
      form.reset();
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-[600px] h-screen m-auto p-6 sm:p-8 bg-background rounded-xl shadow-lg">
      <div className="space-y-4 my-[20%]">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Create Profile</h1>
          <p className="text-muted-foreground">
            Fill out the form to create your profile.
          </p>
        </div>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                {...form.register("name", { required: true })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...form.register("email", { required: true })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                {...form.register("phone", { required: true })}
              />
            </div>
            <div className="grid gap-2">
              {/* <Label htmlFor="">Blood Group</Label> */}
              <FormField
                name="blood_group"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="profile-picture">Profile Picture</Label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  {/* <Input id="profile-picture" type="file" /> */}
                  <Input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    
                    {...form.register("profile", { required: true })}
                  />
                </div>

                {form.watch("profile")?.length > 0 && (
                  <img
                    src={URL.createObjectURL(form.watch("profile")[0])}
                    alt="profile-picture"
                    className="w-20 h-20 rounded-full"
                  />
                )}
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              Create Profile{" "}
              {loading && <Loader className="ml-2 animate-spin" />}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default App;
